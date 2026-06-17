
'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';


import { Skeleton } from '@/components/ui/skeleton';
import { GRID_CONFIG, GridSkeleton } from './GridSkeleton';
import { SliderView } from './SliderView';
import { GridView } from './GridView';


export interface BaseItem {
  id: string;
  name: string;
  image?: string;
}

export interface ProductItem extends BaseItem {
  type: 'product';
  price: number;
  category: string;
}

export interface CategoryItem extends BaseItem {
  type: 'category';
  productCount?: number;
}

export type GridItem = ProductItem | CategoryItem;

export interface SharedGridProps {
  items: GridItem[];
  onItemClick?: (id: string, type: string) => void;
  variant?: 'home' | 'shop' | 'category';
  itemsPerPage?: number;
  showPagination?: boolean;
  isLoading?: boolean;
  className?: string;
  title?: string;
  description?: string;
}



export const SharedGrid = ({
  items,
  onItemClick,
  variant = 'shop',
  itemsPerPage,
  showPagination = true,
  isLoading = false,
  className,
  title,
  description,
}: SharedGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const config = GRID_CONFIG[variant];
  const limit = itemsPerPage || config.defaultLimit;
  const shouldShowSlider = config.showSlider && variant === 'home' && items.length > limit;
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        {title && (
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        )}
        <GridSkeleton count={limit} variant={variant} />
      </div>
    );
  }
  
  if (!items.length) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground">No items found</p>
      </div>
    );
  }
  
  return (
    <div className={cn("space-y-8", className)}>
      {(title || description) && (
        <div className="text-center space-y-2">
          {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      
      {shouldShowSlider ? (
        <SliderView 
          items={items} 
          onItemClick={onItemClick}
          itemsPerPage={limit}
        />
      ) : (
        <GridView 
          items={items}
          onItemClick={onItemClick}
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={showPagination ? handlePageChange : undefined}
          variant={variant}
        />
      )}
    </div>
  );
};

