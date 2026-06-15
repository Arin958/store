import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { CardImage } from './CardImage';
import { CategoryContent, ProductContent } from './ProductContent';

interface BaseCardProps {
  id: string;
  name: string;
  image?: string;
  onClick?: (id: string) => void;
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
}

interface ProductCardProps extends BaseCardProps {
  type: 'product';
  price: number;
  category: string;
}

interface CategoryCardProps extends BaseCardProps {
  type: 'category';
  productCount?: number;
}

type SharedCardProps = ProductCardProps | CategoryCardProps;




const CardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <CardContent className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
    </CardContent>
  </Card>
);

export const SharedCard = (props: SharedCardProps) => {
  const { 
    id, 
    name, 
    image, 
    onClick, 
    className, 
    children, 
    type,
    isLoading = false 
  } = props;

  const handleClick = () => {
    if (!isLoading) {
      onClick?.(id);
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return <CardSkeleton />;
  }

  const renderContent = () => {
    if (type === 'product') {
      return (
        <ProductContent 
          name={name} 
          price={props.price} 
          category={props.category} 
        />
      );
    }
    
    return (
      <CategoryContent 
        name={name} 
        productCount={props.productCount} 
      />
    );
  };

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden transition-all duration-200",
        "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
        className
      )}
    >
      {image && (
        <CardImage src={image} alt={name} type={type} />
      )}
      
      <CardContent className={cn("p-4", !image && "pt-6")}>
        {renderContent()}
        {children}
      </CardContent>
    </Card>
  );
};
