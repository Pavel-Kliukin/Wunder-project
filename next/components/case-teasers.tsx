import React, { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { CaseTeaser } from "@/components/case-teaser";
import { CaseTeaser as CaseTeaserType } from "@/lib/zod/case-teaser";
import { buttonVariants } from "@/ui/button";

interface LatestCasesProps {
  cases?: CaseTeaserType[];
  heading: string;
}

export function CaseTeasers({ cases, heading }: LatestCasesProps) {
  const { t } = useTranslation();

  useEffect(() => {
    // Intersection Observer callback function
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animatedElementId = entry.target.getAttribute("id");
          if (animatedElementId === "leftBox")
            entry.target.classList.add("animate-[slideUp_0.3s_ease-in_forwards]");
          if (animatedElementId === "casesBox")
            entry.target.classList.add(
              "animate-[slideUp_0.3s_ease-in_0.3s_forwards]",
            );
          observer.unobserve(entry.target);
        }
      });
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersection);

    // Target the element to be animated
    const animatedLeftBox = document.getElementById("leftBox");
    const animatedCasesBox = document.getElementById("casesBox");

    // Observe the target element
    if (animatedLeftBox) observer.observe(animatedLeftBox);
    if (animatedCasesBox) observer.observe(animatedCasesBox);

    return () => {
      // Clean up the observer when the component unmounts
      if (animatedLeftBox) observer.unobserve(animatedLeftBox);
      if (animatedCasesBox) observer.unobserve(animatedCasesBox);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div id="caseTeasers" className="w-screen flex justify-center">
      <div className="mt-20 lg:mt-0 w-full max-w-[1664px] px-6 sm:px-16 flex">
        <div className="w-full flex flex-wrap">
          <div className="lg:w-1/2 pr-10 flex flex-col">
            <h2 className="mb-5 md:mb-10 text-primary-600 font-overpass font-bold text-heading-sm md:text-heading-md lg:text-heading-lg">
              {heading}
            </h2>

            <div id="leftBox" className="mt-20 opacity-0">
              <div className="2xl:w-4/5 mb-4 text-steelgray text-md">
                <p className="mb-2">
                  {t(
                    "We help our clients to improve their digital business, competitiveness and customer experience.",
                  )}
                </p>
                <p>
                  {t(
                    "Shaping the digital experiences together with our clients. Take a look at some of our success stories.",
                  )}
                </p>
              </div>
              {cases?.length && (
                <Link
                  href="/cases"
                  className={clsx(
                    buttonVariants({ variant: "secondary" }),
                    "text-base mr-4 mt-4 inline-flex px-5 py-3 h-fit w-fit",
                  )}
                >
                  <div>{t("all-works")}</div>
                </Link>
              )}
            </div>
          </div>

          <div
            id="casesBox"
            className="mt-20 opacity-0 lg:w-1/2 pt-4 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {cases?.map((client) => (
              <CaseTeaser client={client} key={client.id} />
            ))}
            <div className="flex items-center justify-center">
              {!cases?.length && (
                <p className="py-4">{t("no-content-found")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
