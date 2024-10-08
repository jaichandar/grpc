import { useProductStore } from './productStore';


const Forms = () => {
    const editSelectedList = useProductStore((state) => state.editSelectedList);
    const selectedProduct = editSelectedList.find((product) => product.isSelected);
    const inputOnChange = useProductStore((state) => state.inputOnchange);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        inputOnChange(value, name, selectedProduct?.id as number);
    }

    return (
        <div className='container border my-2'>
            <div className='row'>
                <div className='col-6 p-3 d-flex justify-content-center'>
                    <div className='image-wrapper'>
                        <img src={selectedProduct?.formDetails.image} />
                    </div>
                </div>
                <div className='col-6 p-3 border'>
                    <div className='input-wrapper'>
                        <label>Title</label>
                        <input
                            className='input'
                            name='title'
                            value={selectedProduct?.formDetails.title}
                            onChange={handleOnChange}
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
                            value={selectedProduct?.formDetails.price}
                            disabled
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label>Description</label>
                        <textarea 
                            name='description'
                            className='input'
                            value={selectedProduct?.formDetails.description}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label>Count</label>
                        <input
                            className='input'
                            name='count'
                            value={selectedProduct?.formDetails.rating.count}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forms