import { Link } from "@remix-run/react";
import { VmailLogo } from "./icons/vmail";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  return (
    <div className="fixed top-0 z-20 h-20 w-full px-5 backdrop-blur-xl md:px-10 text-white flex items-center justify-between first-letter:shadow-sm">
      <Link to="/" className="font-bold flex items-center justify-center gap-3">
        <VmailLogo />
        <button>
          <span>Tools</span>
        </button>
      </Link>
      <Link
        to="/"
        className="ml-auto text-sm md:text-base hidden md:block" rel="noreferrer">
          {t("Virtual Temporary Email")}
      </Link>
      <Link
        to="/Short-link"
        className="ml-3 md:ml-8 text-sm md:text-base hidden md:block">
        {t("Short-Link")}
      </Link>
      {/*<Link*/}
      {/*  to="/privacy"*/}
      {/*  className="ml-3 md:ml-8 text-sm md:text-base hidden md:block">*/}
      {/*  {t("Privacy")}*/}
      {/*</Link>*/}
      {/*<Link*/}
      {/*  to="/terms"*/}
      {/*  className="ml-3 md:ml-8 text-sm md:text-base hidden md:block">*/}
      {/*  {t("Terms")}*/}
      {/*</Link>*/}
    </div>
  );
}
