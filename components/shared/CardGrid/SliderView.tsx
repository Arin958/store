// components/ui/SliderView.tsx
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { SharedCard } from "../Card/Card";
import { GridItem } from "./CardGrid";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SliderViewProps {
  items: GridItem[];
  onItemClick?: (id: string, type: string) => void;
  itemsPerPage?: number;
}

export const SliderView = ({ 
  items, 
  onItemClick, 
  itemsPerPage = 4 
}: SliderViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Responsive items per page
  const getResponsiveItemsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return itemsPerPage;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return itemsPerPage;
  }, [itemsPerPage]);

  const [responsiveItemsPerPage, setResponsiveItemsPerPage] = useState(itemsPerPage);

  // Group items into slides
  const slides = useMemo(() => {
    const itemsPerSlide = responsiveItemsPerPage;
    const result = [];
    for (let i = 0; i < items.length; i += itemsPerSlide) {
      result.push(items.slice(i, i + itemsPerSlide));
    }
    return result;
  }, [items, responsiveItemsPerPage]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setResponsiveItemsPerPage(getResponsiveItemsPerPage());
      setCurrentIndex(0); // Reset to first slide on resize
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveItemsPerPage]);

  // Navigation functions
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  }, [slides.length]);

  // Mouse/Touch drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setDragOffset(0);
    sliderRef.current?.style.setProperty('transition', 'none');
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStart;
    setDragOffset(diff);
    
    const container = sliderRef.current;
    if (container) {
      const percent = (diff / container.offsetWidth) * 100;
      container.style.transform = `translateX(calc(-${currentIndex * 100}% + ${percent}%))`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    sliderRef.current?.style.setProperty('transition', '');
    
    const threshold = 50; // Minimum drag distance to trigger slide change
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
    
    // Reset transform
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    setDragOffset(0);
    setDragStart(0);
  };

  // Get grid columns based on items per page
  const getGridCols = () => {
    switch (responsiveItemsPerPage) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 sm:grid-cols-2";
      case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    }
  };

  if (!slides.length) return null;

  return (
    <div className="relative w-full group">
      {/* Slider Container */}
      <div 
        className="overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="w-full shrink-0"
              style={{ width: '100%' }}
            >
              <div className={cn(
                "grid gap-4 md:gap-6 px-1",
                getGridCols(),
                "auto-rows-fr"
              )}>
                {slide.map((item) => (
                  <SharedCard
                    key={item.id}
                    {...item}
                    onClick={() => onItemClick?.(item.id, item.type)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {slides.length > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-2 md:left-4 top-1/2 -translate-y-1/2",
              "bg-background/95 backdrop-blur shadow-lg",
              "hover:bg-accent hover:scale-110",
              "transition-all duration-200 z-10",
              "h-9 w-9 md:h-11 md:w-11 rounded-full",
              "pointer-events-auto cursor-pointer",
              "opacity-0 group-hover:opacity-100",
              "focus:opacity-100",
              currentIndex === 0 && "opacity-0 cursor-not-allowed"
            )}
            onClick={goToPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">Previous</span>
          </Button>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-2 md:right-4 top-1/2 -translate-y-1/2",
              "bg-background/95 backdrop-blur shadow-lg",
              "hover:bg-accent hover:scale-110",
              "transition-all duration-200 z-10",
              "h-9 w-9 md:h-11 md:w-11 rounded-full",
              "pointer-events-auto cursor-pointer",
              "opacity-0 group-hover:opacity-100",
              "focus:opacity-100",
              currentIndex === slides.length - 1 && "opacity-0 cursor-not-allowed"
            )}
            onClick={goToNext}
            disabled={currentIndex === slides.length - 1}
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "transition-all rounded-full cursor-pointer",
                currentIndex === idx
                  ? "w-6 md:w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};