// "use client";
// components/ArticleNavigation.tsx
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getArticles} from "@/app/actions/article";


export default async function ArticleNavigation(props: { slug: string }) {

    // Fetch all articles to determine previous and next articles
    const articles = await getArticles();

    const currentIndex = articles.findIndex(article => article.slug === props.slug);

    const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
    const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;


    return (
        <div className="flex justify-between mt-8 pb-4 mb-12 max-w-screen flex-wrap">
            {previousArticle ? (
                    <Button
                        asChild
                        variant={"link"}
                        className="flex-1 min-w-0 justify-start text-left"
                    >
                        <Link
                            href={`/articles/${previousArticle.slug}`}
                            className="text-blue-600 hover:underline truncate max-w-fit min-w-max"
                        >
                            &larr; {previousArticle.title}
                        </Link>
                    </Button>
                ) :
                (
                    <div></div>
                )
            }
            {nextArticle ? (
                <Button
                    asChild
                    variant={"link"}
                    className={"flex-1 min-w-0 justify-start text-left"}
                >
                    <Link
                        href={`/articles/${nextArticle.slug}`}
                        className="text-blue-600 hover:underline truncate max-w-fit ml-auto min-w-max"
                    >
                        {nextArticle.title} &rarr;
                    </Link>
                </Button>
            ) : (
                <div></div>
            )}
        </div>
    );
};
