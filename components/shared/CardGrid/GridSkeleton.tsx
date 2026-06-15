import { cn } from "@/lib/utils";
import { CardSkeleton } from "./CardSkelon";

export const GRID_CONFIG = {
  home: {
    defaultLimit: 4,
    showSlider: true,
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 4,
    },
  },
  shop: {
    defaultLimit: 12,
    showSlider: false,
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
  },
  category: {
    defaultLimit: 9,
    showSlider: false,
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
  },
};


export const GridSkeleton = ({ count = 4, variant = 'home' }: { count?: number; variant?: string }) => {
  const columns = GRID_CONFIG[variant as keyof typeof GRID_CONFIG]?.columns || GRID_CONFIG.home.columns;
  
  return (
    <div className={cn(
      "grid gap-6",
      `grid-cols-${columns.mobile}`,
      `sm:grid-cols-${columns.tablet}`,
      `lg:grid-cols-${columns.desktop}`
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};