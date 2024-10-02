import { useProductStore } from './productStore';
import closeIcon from '../../assets/close.svg';
import './product.css';

const Tabs = () => {
    const editSelectedList = useProductStore((state) => state.editSelectedList);
    const removeTabById = useProductStore((state) => state.removeTabById);
    const selectTab = useProductStore((state) => state.selectTab);
    const showTable = useProductStore((state) => state.showTable);
    const setShowTable = useProductStore((state) => state.setShowTable);

    return (
        <div className='tab-wrapper'>
            {
                !showTable ? (
                    <div className='tab-container' onClick={() => setShowTable(true)}>
                        <p className='tabs'>Table</p>
                    </div>
                ) : null 
            }
            {
                editSelectedList.map((val, i) => (
                    <div 
                        className={val.isSelected ? 'tab-container selected' : 'tab-container'}
                        onClick={() => {
                            selectTab(i)
                            setShowTable(false);
                        }}
                    >
                        <p className='tabs'>Product {val.id}</p>
                        <img src={closeIcon} className='close-icon' onClick={() => removeTabById(val.id)}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Tabs;