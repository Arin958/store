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
    isInitialized: boolean; // Add this
    setProducts: (products: Product[]) => void;
    addProduct: (productData: Omit<Product, 'id'>) => string;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getProductById: (id: string) => Product | undefined;
    getProductsByCategory: (category: string) => Product[];
    clearProducts: () => void;
    initializeStore: () => void;
}

export const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            products: [],
            isLoading: true,
            error: null,
            isInitialized: false, // Add this

            initializeStore: () => {
                const currentProducts = get().products;
                const stored = localStorage.getItem('product-storage');
                setTimeout(() => {
                    if (currentProducts.length === 0 && !stored) {
                        set({ 
                            products: products,
                            isLoading: false,
                            isInitialized: true
                        });
                    } else {
                        set({ 
                            isLoading: false,
                            isInitialized: true
                        });
                    }
                }, 1000);
            },

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

            updateProduct: (id: string, updatedProduct: Partial<Product>) =>
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === id ? { ...product, ...updatedProduct } : product
                    ),
                })),

            deleteProduct: (id: string) =>
                set((state) => ({
                    products: state.products.filter((product) => product.id !== id),
                })),

            getProductById: (id: string) => {
                return get().products.find((product) => product.id === id);
            },

            getProductsByCategory: (category: string) => {
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