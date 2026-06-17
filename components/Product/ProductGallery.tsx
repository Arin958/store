'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    
    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    
    const handleNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    
    const handleThumbnailClick = (index: number) => {
        setSelectedIndex(index);
    };
    
    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                <Image
                    src={images[selectedIndex] || '/placeholder-product.jpg'}
                    alt={`${productName} - Image ${selectedIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
                
                {/* Zoom Button */}
                <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
                    <DialogTrigger asChild>
                        <button 
                            className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                            aria-label="Zoom image"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-0">
                        <div className="relative w-full h-[80vh]">
                            <Image
                                src={images[selectedIndex] || '/placeholder-product.jpg'}
                                alt={productName}
                                fill
                                className="object-contain"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                                onClick={() => setIsZoomOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                
                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                        {selectedIndex + 1} / {images.length}
                    </div>
                )}
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn(
                                "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                                selectedIndex === index 
                                    ? "border-primary ring-2 ring-primary/20" 
                                    : "border-transparent hover:border-gray-300"
                            )}
                            aria-label={`View image ${index + 1}`}
                        >
                            <Image
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}