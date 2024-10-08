import { useProductStore } from './productStore';
import closeIcon from '../../assets/close.svg';
import './product.css';

const Tabs = () => {
    const editSelectedList = useProductStore((state) => state.editSelectedList);
    const removeTabById = useProductStore((state) => state.removeTabById);
    const selectTab = useProductStore((state) => state.selectTab);
    const setShowTable = useProductStore((state) => state.setShowTable);
    const addProductTabs = useProductStore((state) => state.addProductTabs);
    const showTable = useProductStore((state) => state.showTable);

    const handleTabSelect = (i: number) => {
        selectTab(i)
        setShowTable(false);
    }

    return (
        <div className='tab-wrapper'>
            {
                editSelectedList.length ? (
                    <div className={ showTable ? `tab-container selected` : 'tab-container'} onClick={() => { 
                        setShowTable(true)
                        addProductTabs('', true);
                    }}>
                        <p className='tabs'>Table</p>
                    </div>
                ) : null 
            }
            {
                editSelectedList.map((val) => (
                    <div 
                        className={val.isSelected ? 'tab-container selected' : 'tab-container'}
                        onClick={() => handleTabSelect(val.id as number)}
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