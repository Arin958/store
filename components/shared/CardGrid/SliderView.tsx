import { useMemo } from "react";
import { SharedCard } from "../Card/Card";
import { GridItem } from "./CardGrid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from "@/lib/utils";

export const SliderView = ({ 
  items, 
  onItemClick, 
  itemsPerPage = 4 
}: { 
  items: GridItem[]; 
  onItemClick?: (id: string, type: string) => void;
  itemsPerPage?: number;
}) => {
  // Group items into slides
  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
      result.push(items.slice(i, i + itemsPerPage));
    }
    return result;
  }, [items, itemsPerPage]);

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: items.length > itemsPerPage,
      }}
      className="w-full"
    >
      <CarouselContent>
        {slides.map((slide, slideIndex) => (
          <CarouselItem key={slideIndex} className="basis-full">
            <div className={cn(
              "grid gap-6",
              `grid-cols-${Math.min(itemsPerPage, 4)}`,
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            )}>
              {slide.map((item) => (
                <SharedCard
                  key={item.id}
                  {...item}
                  onClick={() => onItemClick?.(item.id, item.type)}
                />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {items.length > itemsPerPage && (
        <>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </>
      )}
    </Carousel>
  );
};
