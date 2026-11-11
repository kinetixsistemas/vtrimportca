import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";

export function SampleBadge({ isSample }: { isSample: boolean }) {
  if (!siteConfig.isDemo || !isSample) return null;
  return <Badge variant="amber">Muestra</Badge>;
}
