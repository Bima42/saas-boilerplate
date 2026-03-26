import Image from "next/image";
import type { Value } from "platejs";
import { PlateStaticViewer } from "@/components/editor/viewer/plate-static-viewer";

type Post = {
	title: string;
	description: string | null;
	content: unknown;
	coverImage: string | null;
	publishedAt: Date | null;
	author: {
		name: string;
		image: string | null;
	};
};

export function BlogPostViewer({ post }: { post: Post }) {
	return (
		<article className="container p-4">
			{post.coverImage && (
				<div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
					<Image
						src={post.coverImage}
						alt={post.title}
						fill
						className="object-cover"
						unoptimized
					/>
				</div>
			)}

			<header className="mb-8">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
					{post.title}
				</h1>
				{post.description && (
					<p className="mt-4 text-xl text-muted-foreground">{post.description}</p>
				)}

				<div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
					{post.author && (
						<>
							{post.author.image && (
								<Image
									src={post.author.image}
									alt={post.author.name || "Author"}
									width={40}
									height={40}
									className="rounded-full"
									unoptimized
								/>
							)}
							<div>
								<div className="font-medium text-foreground">
									{post.author.name}
								</div>
								{post.publishedAt && (
									<time dateTime={new Date(post.publishedAt).toISOString()}>
										{new Date(post.publishedAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</time>
								)}
							</div>
						</>
					)}
				</div>
			</header>

			<div className="prose prose-gray dark:prose-invert max-w-none">
				<PlateStaticViewer
					value={(post.content as Value) || [{ type: "p", children: [{ text: "" }] }]}
				/>
			</div>
		</article>
	);
}
