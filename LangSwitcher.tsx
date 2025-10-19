"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitcher() {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);

  const currentLocale = parts[0] || "en";
  const restOfPath = parts.slice(1).join("/") || "";
  const targetLocale = currentLocale === "ar" ? "en" : "ar";
  const targetHref = `/${targetLocale}/${restOfPath}`;

  return (
    <div style={{ textAlign: "right", margin: "10px" }}>
      <Link href={targetHref}>
        {currentLocale === "ar" ? "English" : "العربية"}
      </Link>
    </div>
  );
}
