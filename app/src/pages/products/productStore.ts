import { create } from 'zustand';
import { productStore, tabValue, Product } from './types';

export const useProductStore = create<productStore>((set) => ({
    loading: false,
    products: [],
    editSelectedList: [],
    showTable: true,
    setProducts: (products) => set((state: productStore) => ({ ...state, products: products })),
    setLoading: (value) => set((state) => ({ ...state, loading: value })),
    addProductTabs: (productTab: tabValue) => set((state) => ({
        ...state,
        editSelectedList: [
            ...state.editSelectedList.map((val) => ({ ...val, isSelected: false })),
            productTab,
        ]
    })),
    removeTabById: (id: number | string) => set((state) => ({
        ...state, 
        editSelectedList: state.editSelectedList.filter((val) => val.id !== id),
    })),
    selectTab: (index: number) => set((state) => ({
        ...state, 
        editSelectedList: [
            ...state.editSelectedList.map((val, i) => {
                if (index === i) {
                    return {
                        ...val,
                        isSelected: true
                    }
                } else {
                    return { ...val, isSelected: false }
                }
            })
        ]
    })),
    setShowTable: (val: boolean) => set((state) => ({
        ...state,
        showTable: val,
    })),
}));
