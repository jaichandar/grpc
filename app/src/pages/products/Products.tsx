import { useEffect } from 'react';
import { useProductStore } from './productStore';
import Tabs from './Tabs';
import { Product } from './types';

const Products = () => {
    const loading = useProductStore((state) => state.loading);
    const products = useProductStore((state) => state.products);
    const setProducts = useProductStore((state) => state.setProducts);
    const setLoading = useProductStore((state) => state.setLoading);
    const addProductTabs = useProductStore((state) => state.addProductTabs);
    const editSelectedList = useProductStore((state) => state.editSelectedList);
    const showTable = useProductStore((state) => state.showTable);
    const setShowTable = useProductStore((state) => state.setShowTable);

    console.log('dev-2');

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
            <p>Products</p>
            {
                editSelectedList.length ? 
                (
                    <div style={{ display: 'flex' }}>
                        <Tabs />
                    </div>
                ) : null
            }
            {
                showTable ? 
                <table className="table table-dark table-striped">
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
                <div className='container border border-primary'>
                    <div className='row'>
                        <div className='col-4 p-3 border border-danger d-flex justify-content-center'>
                            <div className='image-wrapper'>
                                <img />
                            </div>
                        </div>
                        <div className='col-8 p-3 border border-danger'>
                            <div className='input-wrapper'>
                                <label>Title</label>
                                <input 
                                    className='input'
                                />
                            </div>
                            <div className='input-wrapper'>
                                <label>Category</label>
                                <input 
                                    className='input'
                                    value={`Men's Clothing`}
                                    disabled
                                />
                            </div>
                            <div className='input-wrapper'>
                                <label>Price</label>
                                <input 
                                    className='input'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        {(loading && !products.length) && <p>Loading...</p>}
        </div>
    )
}

export default Products;