// store/useProductStore.ts
import { products } from '@/data/dummyProduct';
import { generateRandomId } from '@/lib/generateRandomId';
import { Product } from '@/types/product';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProductStore {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    setProducts: (products: Product[]) => void;
    addProduct: (productData: Omit<Product, 'id'>) => string; 
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void; 
    deleteProduct: (id: string) => void;
    getProductById: (id: string) => Product | undefined; 
    getProductsByCategory: (category: string) => Product[];
    clearProducts: () => void;
}

export const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            products: products,
            isLoading: false,
            error: null,

            setProducts: (products) => set({ products }),

            addProduct: (productData) => {
                const newId = generateRandomId();
                const newProduct: Product = {
                    ...productData,
                    id: newId,
                    primaryImageIndex: productData.images && productData.images.length > 0 ? 0 : undefined,
                };
                
                set((state) => ({
                    products: [...state.products, newProduct],
                }));
                
                return newId;
            },

            updateProduct: (id: string, updatedProduct: Partial<Product>) => // Fixed: added proper types
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === id ? { ...product, ...updatedProduct } : product
                    ),
                })),

            deleteProduct: (id: string) => // Fixed: added type
                set((state) => ({
                    products: state.products.filter((product) => product.id !== id),
                })),

            getProductById: (id: string) => { // Fixed: singular name and added type
                return get().products.find((product) => product.id === id);
            },

            getProductsByCategory: (category: string) => { // Fixed: added type
                return get().products.filter((product) => product.category === category);
            },

            clearProducts: () => set({ products: [] }),
        }),
        {
            name: 'product-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);