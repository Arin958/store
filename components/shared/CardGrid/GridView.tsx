import { cn } from "@/lib/utils";
import { GridItem } from "./CardGrid";
import { SharedCard } from "../Card/Card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { GRID_CONFIG } from "./GridSkeleton";

export const GridView = ({ 
  items, 
  onItemClick, 
  itemsPerPage = 12,
  currentPage = 1,
  onPageChange,
  variant = 'shop'
}: { 
  items: GridItem[]; 
  onItemClick?: (id: string, type: string) => void;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  variant?: string;
}) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  
  const columns = GRID_CONFIG[variant as keyof typeof GRID_CONFIG]?.columns || GRID_CONFIG.home.columns;

  return (
    <div className="space-y-8">
      <div className={cn(
        "grid gap-6",
        `grid-cols-${columns.mobile}`,
        `sm:grid-cols-${columns.tablet}`,
        `lg:grid-cols-${columns.desktop}`
      )}>
        {currentItems.map((item) => (
          <SharedCard
            key={item.id}
            {...item}
            onClick={() => onItemClick?.(item.id, item.type)}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) return null;
              }
              
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => onPageChange?.(pageNum)}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange?.(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
