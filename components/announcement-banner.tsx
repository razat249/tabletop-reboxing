"use client";

import { Info, AlertTriangle, Wrench, AlertOctagon } from "lucide-react";
import { config, type BannerType } from "@/app/assets/data";
import { cn } from "@/lib/utils";

const bannerStyles: Record<
  BannerType,
  { bg: string; icon: typeof Info; label: string }
> = {
  info: {
    bg: "bg-blue-600 dark:bg-blue-700",
    icon: Info,
    label: "Information",
  },
  warning: {
    bg: "bg-amber-500 dark:bg-amber-600",
    icon: AlertTriangle,
    label: "Warning",
  },
  maintenance: {
    bg: "bg-purple-600 dark:bg-purple-700",
    icon: Wrench,
    label: "Maintenance Notice",
  },
  critical: {
    bg: "bg-red-600 dark:bg-red-700",
    icon: AlertOctagon,
    label: "Important",
  },
};

export default function AnnouncementBanner() {
  const { message, type = "info" } = config.banner ?? {};
  if (!message) return null;

  const style = bannerStyles[type] ?? bannerStyles.info;
  const Icon = style.icon;

  return (
    <div
      role="status"
      aria-label={style.label}
      className={cn(
        style.bg,
        "relative z-50 text-white"
      )}
    >
      <div className="page-container flex items-center justify-center gap-2.5 py-2.5 px-4 sm:px-6">
        <Icon size={16} className="flex-shrink-0 opacity-90" strokeWidth={2.5} />
        <p className="text-xs sm:text-sm font-medium leading-snug text-center">
          {message}
        </p>
      </div>
    </div>
  );
}
