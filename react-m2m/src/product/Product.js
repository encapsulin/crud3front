import '../App.css'
import '../misc/stylebox.css';
import React, { useState } from 'react';
import ItemList from './ItemList'
import AppModal from '../AppModal';
import ItemEdit from './ItemEdit';

export default function Product({parentId}){

    const [propsModal, setPropsModal] = useState({
      title: null,
      isOpen: false,
      id: 0
    });
  
    function fnHandleOpen(isOpen_) {
      setPropsModal({ ...propsModal, isOpen: isOpen_ })
    }
  
    const [modalId, setModalId] = useState(null)
  
    const handleClick = (id) => {
      console.log("handleClick:"+id)
      setModalId(id);
      if (Number(id)  > 0)
          setPropsModal({ ...propsModal, isOpen: true, title: "Edit Product",id:modalId }); 
      else
          setPropsModal({ ...propsModal, isOpen: true, title: "Add Product",id:0 }); 
    }

    const[reload, setReload] = useState(false)

    return <div className='boxcol'>

        <ItemList parentId={parentId} handleClick={handleClick} reload={reload} setReload={setReload}/>
  
     
    <AppModal props={propsModal} fnHandleOpen={fnHandleOpen}>
         <ItemEdit id={modalId} fnHandleOpen={fnHandleOpen} setReload={setReload}/> 
      </AppModal>
    </div>
}