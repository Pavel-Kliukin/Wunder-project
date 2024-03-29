import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { ThemeSwitcher } from "components";
import { ThemeProvider } from "components/theme-prodiver";

import { Menu } from "@/lib/zod/menu";
import SearchIcon from "@/styles/icons/search.svg";
import WunderIcon from "@/styles/icons/wunder.svg";
import WunderCarrot from "@/styles/icons/wunder-carrot.svg";

import { MainMenu, MenuExpanded, MenuToggle } from "../main-menu/main-menu";

import { LanguageSwitcher } from "./language-switcher";
import { UserMenu } from "./user-menu";

interface HeaderProps {
  menu: Menu;
}

export function Header({ menu }: HeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  return (
    <header className="z-50 flex-shrink-0 border-b border-finnishwinter bg-white text-primary-600 md:sticky md:top-0">
      <nav className="mx-auto flex max-w-[1664px] flex-row items-center justify-between px-4 sm:px-16 py-4">
        <HomeLink />
        <div className="flex flex-row items-center justify-end gap-6 sm:gap-8">
          <MenuExpanded menu={menu} />
          {/* <UserMenu /> */}
          <LanguageSwitcher />
          <SearchLink />
          <MenuToggle isOpen={isMainMenuOpen} setIsOpen={setIsMainMenuOpen} />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeSwitcher />
          </ThemeProvider>
        </div>
      </nav>
      <MainMenu
        menu={menu}
        isOpen={isMainMenuOpen}
        setIsOpen={setIsMainMenuOpen}
      />
    </header>
  );
}

function HomeLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/" locale={locale} className="inline">
      <WunderIcon className="w-32 hidden sm:block" />
      <WunderCarrot className="h-11 w-11 sm:hidden" />
      <span className="sr-only">{t("homepage-link")}</span>
    </Link>
  );
}

function SearchLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/search" locale={locale} className="hover:underline">
      {/*      <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
        {t("search")}
      </span> */}
      <SearchIcon className="inline-block h-6 w-6" aria-hidden="true" />
    </Link>
  );
}
