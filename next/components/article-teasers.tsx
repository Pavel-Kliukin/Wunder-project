import { useTranslation } from "next-i18next";
import { ArticleTeaser } from "@/components/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";

interface LatestArticlesProps {
  articles?: ArticleTeaserType[];
  heading: string;
}

export function ArticleTeasers({ articles, heading }: LatestArticlesProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 flex">
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <ul className=" mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
}
