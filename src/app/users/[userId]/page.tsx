import {getArticlesByAuthorId} from "@/app/actions/author";
import {getQueryClient} from "@/app/api/query";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import AuthorInfo from "@/app/articles/[slug]/AuthorInfo";
import ArticlesList from "@/app/articles/ArticleList";

export default async function UserIdPage(props: PageProps<"/users/[userId]">) {
    const {userId} = await props.params;

    const queryClient = getQueryClient();
    const articlesByAuthorPrefetch = queryClient.prefetchQuery({
        queryKey: ["articles", userId],
        queryFn: () => getArticlesByAuthorId(userId)
    });

    const authorPrefetch = queryClient.prefetchQuery({
        // warning: maybe user?
        queryKey: ["author", userId],
    });

    await Promise.all([authorPrefetch, articlesByAuthorPrefetch]);

    return <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthorInfo authorId={userId}/>
            {/*<AuthorArticleList authorId={userId}/>*/}
            <ArticlesList byAuthorId={userId}/>

        </HydrationBoundary>
    </div>;
}