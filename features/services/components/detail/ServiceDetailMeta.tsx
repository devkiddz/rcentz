import {
  BadgeCheck,
  BriefcaseBusiness,
  Layers3,
} from "lucide-react";

import type { ServiceDetail } from "../../server/get-service-by-slug";

type ServiceDetailMetaProps = {
  service: ServiceDetail;
};

function humanize(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ServiceDetailMeta({
  service,
}: ServiceDetailMetaProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {service.category ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted/30 px-3 py-1.5 text-[8px] font-medium text-muted">
          <Layers3 className="size-3 text-theme-accent" />
          {service.category.name}
        </span>
      ) : null}

      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted/30 px-3 py-1.5 text-[8px] font-medium text-muted">
        <BriefcaseBusiness className="size-3 text-theme-accent" />
        {humanize(service.type)}
      </span>

      {service.featured ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-accent/15 bg-theme-accent-soft px-3 py-1.5 text-[8px] font-medium text-theme-accent">
          <BadgeCheck className="size-3" />
          Featured service
        </span>
      ) : null}
    </div>
  );
}
