import {
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Eye,
  Gem,
  GitBranch,
  HeartHandshake,
  LifeBuoy,
  type LucideProps,
  Layers,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

const ICONS = {
  layers: Layers,
  smartphone: Smartphone,
  palette: Palette,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
  target: Target,
  eye: Eye,
  "life-buoy": LifeBuoy,
  "check-circle-2": CheckCircle2,
  gem: Gem,
  "heart-handshake": HeartHandshake,
  trophy: Trophy,
  "shopping-bag": ShoppingBag,
  code: Code2,
  server: Server,
  database: Database,
  cloud: Cloud,
  "git-branch": GitBranch,
  rocket: Rocket,
} as const;

/**
 * Resolves the icon slug the Go API (or local content) returns and renders
 * it, falling back to a sensible default. A dedicated component — rather
 * than callers doing `const Icon = getIcon(name); <Icon />` — keeps the
 * lookup-then-render pattern in exactly one place.
 */
export function CatalogIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Layers;
  return <Icon {...props} />;
}
