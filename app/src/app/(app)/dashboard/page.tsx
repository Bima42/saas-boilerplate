'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/better-auth/auth-client';
import { trpc } from '@/lib/trpc/client';
import { toast } from 'sonner';

export default function DashboardPage() {
    const router = useRouter();

    const { data: session, isPending: isSessionLoading } = authClient.useSession();

    const {
        data: secretData,
        isLoading: isTrpcLoading,
        error: trpcError
    } = trpc.test.getSecretMessage.useQuery(undefined, {
        enabled: !!session,
        retry: false
    });

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Signed out successfully');
                    router.push('/login');
                }
            }
        });
    };

    if (isSessionLoading || (session && isTrpcLoading)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                    <p className="text-gray-500 text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500 text-sm">Welcome back to Boilerplate</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors text-sm font-medium"
                    >
                        Sign Out
                    </button>
                </header>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* User Profile Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            User Profile
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-50">
                                <span className="text-gray-500">Name</span>
                                <span className="font-medium">{session?.user.name}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-50">
                                <span className="text-gray-500">Email</span>
                                <span className="font-medium">{session?.user.email}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-50">
                                <span className="text-gray-500">ID</span>
                                <span className="font-mono text-xs text-gray-400">{session?.user.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* System Status / tRPC Test Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            System Status (tRPC)
                        </h2>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            {trpcError ? (
                                <div className="text-red-500 text-sm">
                                    <p className="font-bold">Error connecting to API:</p>
                                    <p>{trpcError.message}</p>
                                </div>
                            ) : secretData ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">Server says:</p>
                                    <p className="text-green-700 font-medium bg-green-50 p-2 rounded border border-green-100">
                                        {secretData.message}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">✅ Authenticated tRPC call successful</p>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">Waiting for server response...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
