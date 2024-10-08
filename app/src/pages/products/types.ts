export interface productStore {
    loading: boolean;
    products: Product[];
    editSelectedList: tabValue[],
    cloneProducts: Product[],
    showTable: boolean,
    setProducts: (product: Product[]) => void;
    setLoading: (value: boolean) => void;
    addProductTabs: (value?: tabValue | string, all?: boolean) => void;
    removeTabById: (id: number | string) => void;
    selectTab: (index: number) => void;
    setShowTable: (val: boolean) => void;
    inputOnchange: (value: string, key: string, index: number) => void;
}

export interface tabValue {
    id: number | string;
    formDetails: Product;
    isSelected: boolean;
}

export interface Product {
    id: number | string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    }
}