import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: Props) {
  return (
    <div className={cn("group", className)}>
      <div className="h-12 w-12 rounded-2xl bg-terracotta-50 flex items-center justify-center mb-5 group-hover:bg-terracotta-100 transition-colors">
        <Icon className="h-6 w-6 text-terracotta-600" strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-2xl mb-2 text-ink-900">{title}</h3>
      <p className="text-ink-600 leading-relaxed">{description}</p>
    </div>
  );
}
