'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
    label: string;
    href: string;
    isCurrent?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
    separator?: React.ReactNode;
}

export function Breadcrumbs({ 
    items, 
    className,
    separator = <ChevronRight className="w-4 h-4" />
}: BreadcrumbsProps) {
    return (
        <nav 
            aria-label="Breadcrumbs" 
            className={cn("flex items-center space-x-2 text-sm", className)}
        >
            <Link 
                href="/" 
                className="text-muted-foreground hover:text-foreground transition-colors"
            >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
            </Link>
            
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                
                return (
                    <div key={item.href} className="flex items-center space-x-2">
                        {separator}
                        {isLast || item.isCurrent ? (
                            <span className="font-medium text-foreground">
                                {item.label}
                            </span>
                        ) : (
                            <Link 
                                href={item.href}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}