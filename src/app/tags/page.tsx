import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "All Tags and their articles",
  description:
    "Browse all topics and tags on our site. Explore content by category and discover what interests you.",
};

export default async function TagPage(props: PageProps<"/tags">) {
  const addedTopics = await prisma.tagsOnArticles.findMany({
    include: {
      topic: true,
    },
  });

  // console.log("addedTopics", addedTopics);

  // key is slug

  const tagMap: Map<
    string,
    {
      tagName: string;
      tagSlug: string;
      articleName: string;
      articleSlug: string;
      articleDesc: string;
    }[]
  > = new Map();

  const tagsMap = addedTopics.map(async (addedTopic) => {
    // const tagMap: Map<string, {
    //     tagName: string,
    //     tagSlug: string,
    //     articleName: string,
    //     articleSlug: string,
    //     articleDesc: string
    // }[]> = new Map();

    // get article
    const article = await prisma.article.findUnique({
      where: {
        id: addedTopic.articleId,
      },
    });
    if (!article) {
      throw new Error("No article found for this page");
    }

    if (tagMap.has(addedTopic.topic.id)) {
      let prevData = tagMap.get(addedTopic.topic.id);
      if (!prevData) {
        return new Error("key found but no prev data");
      }

      prevData.push({
        tagSlug: addedTopic.topic.slug,
        tagName: addedTopic.topic.name,
        articleSlug: article.slug,
        articleDesc: article.description,
        articleName: article.title,
      });

      // console.log("tagMap", tagMap);
      // todo use id
      tagMap.set(addedTopic.topic.id, prevData);
    } else {
      tagMap.set(addedTopic.topic.id, [
        {
          tagSlug: addedTopic.topic.slug,
          tagName: addedTopic.topic.name,
          articleSlug: article.slug,
          articleDesc: article.description,
          articleName: article.title,
        },
      ]);
    }
  });

  await Promise.all(tagsMap);

  return (
    <div className="container max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mt-24">All Tags</h1>
      {tagMap
        .entries()
        .toArray()
        .map(
          ({
            0: tagId,
            1: tagArticleList,
          }: [
            // id of tag
            string,
            // articles of tag
            {
              tagSlug: string;
              tagName: string;
              articleSlug: string;
              articleDesc: string;
              articleName: string;
            }[],
          ]) => {
            return (
              <div key={tagId}>
                {/*{JSON.stringify(a)}*/}
                <h2 className={"text-2xl mt-16 mb-2"}>
                  <Link
                    href={`/tags/${tagArticleList[0].tagSlug}`}
                    className="hover:underline"
                  >
                    Tag "{tagArticleList[0].tagName}"
                  </Link>
                </h2>
                {tagArticleList.map((tag) => (
                  <div
                    key={tag.tagSlug + tag.articleSlug}
                    className="border p-4 mb-4 rounded"
                  >
                    <Link href={`/articles/${tag.articleSlug}`}>
                      <h3 className="text-xl font-bold mb-4 hover:underline line-clamp-1">
                        {tag.articleName}
                      </h3>
                    </Link>
                    <p className={"max-w-3/4 line-clamp-4"}>
                      {tag.articleDesc}
                    </p>
                  </div>
                ))}
              </div>
            );
          },
        )}

      {/*<h1 className={"dark text-3xl my-16"}> "{topic.name}" tagged articles:</h1>*/}
      {/*<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">*/}
      {/*    {taggedArticles.map((taggedArticle) =>*/}
      {/*        (<div key={taggedArticle.article.id} className="border p-4 mb-4 rounded">*/}
      {/*            /!*<Button variant={"link"} asChild={true}>*!/*/}
      {/*            <Link href={`/articles/${taggedArticle.article.slug}`}>*/}
      {/*                <h2 className="text-xl font-bold mb-4 hover:underline line-clamp-1">{taggedArticle.article.title}</h2>*/}
      {/*            </Link>*/}
      {/*            /!*</Button>*!/*/}
      {/*            <p className={"max-w-3/4 line-clamp-4"}>{taggedArticle.article.description}</p>*/}
      {/*        </div>)*/}
      {/*    )}*/}
      {/*</div>*/}
    </div>
  );
}
