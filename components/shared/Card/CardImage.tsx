import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Badge } from '@/components/ui/badge';

export const CardImage = ({ 
  src, 
  alt, 
  type 
}: { 
  src: string; 
  alt: string; 
  type: 'product' | 'category';
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-48 w-full overflow-hidden bg-muted">
      {isLoading && (
        <Skeleton className="absolute inset-0 h-full w-full" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-transform duration-300 group-hover:scale-110",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
        loading="lazy"
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
      <Badge 
        variant={type === 'product' ? 'default' : 'secondary'}
        className="absolute top-2 right-2 z-10"
      >
        {type === 'product' ? 'Product' : 'Category'}
      </Badge>
    </div>
  );
};