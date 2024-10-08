import { useEffect } from 'react';
import { useProductStore } from './productStore';
import Tabs from './Tabs';
import { Product } from './types';
import Forms from './Forms';

const Products = () => {
    const loading = useProductStore((state) => state.loading);
    const products = useProductStore((state) => state.products);
    const setProducts = useProductStore((state) => state.setProducts);
    const setLoading = useProductStore((state) => state.setLoading);
    const addProductTabs = useProductStore((state) => state.addProductTabs);
    const editSelectedList = useProductStore((state) => state.editSelectedList);
    const showTable = useProductStore((state) => state.showTable);
    const setShowTable = useProductStore((state) => state.setShowTable);

    const getAllProducts = () => {
        setLoading(true);
        return fetch('http://localhost:4000/api/v1/product/getall', { method: 'GET' }).then((res) => res.json())
    }

    useEffect(() => {
        getAllProducts().then((val) => {
            const { success, data: { products } } = val;
            if (success) {
                setProducts(products);
            } else {
                throw new Error('Something went wrong');
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const handleEdit = (val: Product) => {
        const { id } = val;
        addProductTabs({ id, isSelected: true, formDetails: val });
        setShowTable(false);
    }

    return (
        <div className='container border'>
            <p className='text-center'>Products</p>
            {
                editSelectedList.length ?
                    (
                        <div style={{ display: 'flex', position: 'sticky', top: '0px' }}>
                            <Tabs />
                        </div>
                    ) : null
            }
            {
                (showTable || !editSelectedList.length) ?
                    <table className="table table-striped">
                        <thead className='text-center'>
                            <tr>
                                <th>Sno</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!loading && products.length) && (
                                products.map((val, index) => (
                                    <tr key={index}>
                                        <td>{val.id}</td>
                                        <td>{val.title}</td>
                                        <td>{val.description}</td>
                                        <td>{val.price}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => handleEdit(val)}>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table> : (
                        <Forms />
                    )
            }
            {(loading && !products.length) && <p className='text-center'>Loading...</p>}
        </div>
    )
}

export default Products;