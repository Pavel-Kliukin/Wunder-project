import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { deserialize } from "next-drupal";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { EventCard } from "@/components/event-card";
import { EventTeaser } from "@/components/event-teaser";
import { ExpertTalksCard } from "@/components/expert-talks-card";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Pagination, PaginationProps } from "@/components/pagination";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getLatestEventsItems } from "@/lib/drupal/get-events";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  EventTeaser as EventTeaserType,
  validateAndCleanupEventTeaser,
} from "@/lib/zod/event-teaser";
import Chevron from "@/styles/icons/chevron-down.svg";

import siteConfig from "@/site.config";
import { Checkbox } from "@/ui/checkbox";

interface NewsAndEventsPageProps extends LayoutProps {
  eventTeasers: EventTeaserType[];
  paginationProps: PaginationProps;
  languageLinks: LanguageLinks;
  event_tags: DrupalTaxonomyTerm[];
}

export default function NewsAndEventsPage({
  eventTeasers = [],
  paginationProps,
  event_tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [tagsSearch, setTagsSearch] = useState<string[]>([]);
  const [paginationNewProps, setPaginationNewProps] =
    useState<object>(paginationProps);
  const [events, setEvents] = useState<EventTeaserType[]>(eventTeasers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [offset, setOffset] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const page = +router.asPath.split("/")[2];
    if (page) {
      setOffset((page - 1) * limit);
      setCurrentPage(page);
    }
  }, [router.asPath, limit]);

  useEffect(() => {
    const doBody = async () => {
      const body = {
        offset,
        limit,
        locale: siteConfig.defaultLocale,
        tags: tagsSearch,
      };
      const response = await fetch("/api/news-and-events-filter", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();

        let totalPages;
        const pageRoot = "/news-and-events";
        if (result.data) {
          const nodes = deserialize(result) as DrupalNode[];
          totalPages = Math.ceil(result.meta.count / limit);
          if (currentPage > totalPages) {
            void router.push([pageRoot, totalPages].join("/"), null, {
              scroll: false,
            });
          }
          setEvents(
            nodes.map((teaser) => validateAndCleanupEventTeaser(teaser)),
          );
        }

        // Create pagination props.
        const prevEnabled = currentPage > 1;
        const nextEnabled = currentPage < totalPages;

        // Create links for prev/next pages.
        const prevPage = currentPage - 1;
        const nextPage = currentPage + 1;
        const prevPageHref =
          currentPage === 2
            ? pageRoot
            : prevEnabled && [pageRoot, prevPage].join("/");
        const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

        setPaginationNewProps({
          currentPage,
          totalPages,
          prevEnabled,
          nextEnabled,
          prevPageHref,
          nextPageHref,
        });
      }
    };
    doBody();
  }, [limit, offset, tagsSearch, currentPage, router]);

  const handleCheckboxChange = (value: string) => {
    if (tagsSearch.includes(value)) {
      setTagsSearch(tagsSearch.filter((tag) => tag !== value));
    } else {
      setTagsSearch([...tagsSearch, value]);
    }
  };

  const toggleExpansion = () => {
    setIsExpanded((value) => !value);
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16">
        <Meta title={t("news-and-events")} metatags={[]} />
        <div ref={focusRef} tabIndex={-1} />
        <HeadingPage>{t("our-events")}</HeadingPage>
        <button
          className={clsx(
            "text-primary-600 flex flex-row w-full justify-between justify-items-center items-center text-heading-sm mt-16 bg-mischka p-8 border-0 rounded-t-2xl",
          )}
          onClick={toggleExpansion}
        >
          {t("apply-filters")}
          <Chevron
            className={clsx(
              "h-10 w-10 transition-all duration-200 ease-in-out",
              isExpanded ? "rotate-180" : "",
            )}
          />
        </button>
        <div
          className={clsx(
            "flex flex-col lg:flex-row justify-between text-sm text-white bg-primary-500 overflow-hidden transition-max-height duration-500 ease-in-out mb-12 px-24 border-0 rounded-b-sm",
            isExpanded ? "max-h-screen p-16" : "max-h-0 p-0",
          )}
        >
          <ul>
            {event_tags.map((tag) => (
              <li
                key={tag.id}
                className="flex items-center text-sm text-steelgray"
              >
                <Checkbox
                  onClick={() => handleCheckboxChange(tag.name)}
                  id={tag.id}
                  className="bg-white hover:bg-stone transition-colors duration-200 ease-in-out"
                />
                <label
                  className="ml-2 text-sm text-white"
                  htmlFor={tag.id}
                  id={tag.id}
                >
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 grid gap-8 grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id}>
              {event.field_event_tags[0].name.includes("Expert") ? (
                <ExpertTalksCard event={event} eventUrl={event.path.alias} />
              ) : null}

              {event.field_event_tags[0].name.includes("Event") ? (
                <EventCard event={event} eventUrl={event.path.alias} />
              ) : null}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-10 mb-20">
          <div className="max-w-[700px] flex flex-grow justify-between">
            <Pagination
              focusRestoreRef={focusRef}
              paginationProps={paginationNewProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { page: ["1"] },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<NewsAndEventsPageProps> = async (
  context,
) => {
  // Get the page parameter:
  const page = context.params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  const PAGE_SIZE = 6;

  const { totalPages, events } = await getLatestEventsItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale: context.locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/news-and-events";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  // Create language links for this page.
  // Note: the links will always point to the first page, because we cannot guarantee that
  // the other pages will exist in all languages.
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);

  const event_tags = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >("taxonomy_term--event_tags", context, {});

  return {
    props: {
      ...(await getCommonPageProps(context)),
      eventTeasers: events.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
      paginationProps: {
        currentPage,
        totalPages,
        prevEnabled,
        nextEnabled,
        prevPageHref,
        nextPageHref,
      },
      languageLinks,
      event_tags,
    },
    revalidate: 60,
  };
};
