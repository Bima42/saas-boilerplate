import { user } from '@/server/db/schema';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';

export async function getUserById(userId: string) {
    return db.query.user.findFirst({
        where: eq(user.id, userId)
    });
}

export async function updateUserStripeCustomerId(data: { userId: string; stripeCustomerId: string }) {
    await db.update(user).set({ stripeCustomerId: data.stripeCustomerId }).where(eq(user.id, data.userId));
}
