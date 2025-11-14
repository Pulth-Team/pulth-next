"use client";
import {useQuery} from "@tanstack/react-query";
import {getAuthorBySlug} from "@/app/actions/article";
import Link from "next/link";
import {getAuthorInfo} from "@/app/actions/author";
import {getQueryClient} from "@/app/api/query";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


const syncAuthorQueryCache = async (
    author: Awaited<ReturnType<typeof getAuthorInfo>>,
    props: { slug: string } | { authorId: string },
) => {
    // if author is null, nothing to sync
    if (!author) return;

    const queryClient = getQueryClient();
    if ("slug" in props) {
        // Keep the authorId-based cache in sync when loading by slug
        queryClient.setQueryData(["author", author.id], author);
        return;
    }
    // if a user is
    // /userId page => /articles by authorId
    // articles by authorId => articles by slug


};


export default function AuthorInfo(props: { slug: string } | { authorId: string }) {
    const {data: authorData, isLoading, isError, error} = useQuery({
        queryKey: 'slug' in props
            ? ["articles", "author", props.slug]
            : ["author", props.authorId],
        queryFn: async ({queryKey}) => {
            const author =
                "slug" in props
                    ? await getAuthorBySlug(props.slug)
                    : await getAuthorInfo(props.authorId);

            await syncAuthorQueryCache(author, props);

            return author;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });


    return <div>
        {isLoading && <div>Loading author info...</div>}
        {isError && <div>Error loading author info.{JSON.stringify(error)}</div>}
        {authorData && <div className="flex items-center space-x-4 my-8 mx-4">
            <Avatar className={"w-16 h-16"}>
                <AvatarImage src={authorData.image || "/default_profile.jpg"} alt={authorData.name}/>
                <AvatarFallback>
                    {authorData.name?.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
            </Avatar>
            <Link href={"/users/" + authorData.id}>
                <h4 className="text-lg leading-none">
                    {authorData.name}
                </h4>
                <p>
                    {authorData.description}
                </p>
            </Link>
        </div>
        }
    </div>

}