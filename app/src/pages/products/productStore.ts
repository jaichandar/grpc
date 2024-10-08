import { create } from 'zustand';
import { productStore, tabValue } from './types';

export const useProductStore = create<productStore>((set) => ({
    loading: false,
    products: [],
    cloneProducts: [],
    editSelectedList: [],
    showTable: true,
    setProducts: (products) => set((state: productStore) => ({ ...state, products: products, cloneProduct: products })),
    setLoading: (value) => set((state) => ({ ...state, loading: value })),
    addProductTabs: (productTab?: tabValue | string, all?: boolean) => {
        if (all) {
            return set((state) => ({
                ...state,
                editSelectedList: state.editSelectedList.map((val) => ({
                    ...val,
                    isSelected: false,
                }))
            }))
        } else {
            if (typeof productTab === 'object')
            return set((state) => ({
                ...state,
                editSelectedList: [
                    ...state.editSelectedList.map((val) => {
                        return {
                            ...val,
                            isSelected: false
                        }
                    }),
                    productTab,
                ]
            }))
        }
    },
    removeTabById: (id: number | string) => {
        return set((state) => {
            return {
                ...state,
                editSelectedList: state.editSelectedList.filter((val) => val.id !== id),
            }
        })
    },
    selectTab: (id: number) => set((state) => ({
        ...state, 
        editSelectedList: [
            ...state.editSelectedList.map((val) => {
                if (id === val.id) {
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
    inputOnchange: (value: string | number, key: string, id: number) => set((state) => ({
        ...state,
        editSelectedList: state.editSelectedList.map((val) => {
            if (val.id === id) {
                if (key === 'count') {
                    return {
                        ...val,
                        formDetails: {
                            ...val.formDetails,
                            rating: {
                                ...val.formDetails.rating,
                                count: Number(value),
                            }
                        }
                    }
                } else {
                    return {
                        ...val,
                        formDetails: {
                            ...val.formDetails,
                            [key]: value,
                        }
                    }
                }
            } else {
                return val;
            }
        })
        
    }))
}));
