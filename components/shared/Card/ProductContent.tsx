export const ProductContent = ({ name, price, category }: { name: string; price: number; category: string }) => (
  <div className="flex flex-col h-full">
    <h3 className="text-lg font-semibold tracking-tight line-clamp-2 mb-2">
      {name}
    </h3>
    <div className="mt-auto space-y-1">
      <p className="text-2xl font-bold text-primary">
        ${price.toFixed(2)}
      </p>
      <p className="text-sm text-muted-foreground">
        Category: {category}
      </p>
    </div>
  </div>
);

export const CategoryContent = ({ name, productCount }: { name: string; productCount?: number }) => (
  <div className="flex flex-col h-full items-center text-center">
    <h3 className="text-xl font-semibold tracking-tight mb-2">
      {name}
    </h3>
    {productCount !== undefined && (
      <p className="text-sm text-muted-foreground">
        {productCount} {productCount === 1 ? 'product' : 'products'}
      </p>
    )}
  </div>
);