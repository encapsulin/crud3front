import '../App.css'
import '../misc/stylebox.css';
import Loading from '../loading/Loading'
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from "../misc/config";
import ItemList from './ItemList'
import { httpGet } from '../misc/httpGet'; 
import { nestItems } from "../misc/nestItems";
import ItemEdit from './ItemEdit';

import AppModal from '../AppModal.js';

export default function Navi({ onSelect }){

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({})
    const [error, setError] = useState(null); 

    useEffect(() => {
      const url = `${API_BASE_URL}navis`;
      httpGet(url)
        .then((data) => {
          var nested = nestItems(data);
          setItems(nested);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, [loading]);
    
    const [propsModal, setPropsModal] = useState({
      title: null,
      isOpen: false,
    });
  
    function fnHandleOpen(isOpen_) {
      setPropsModal({ ...propsModal, isOpen: isOpen_ })
    }
    
    const handleClickEdit = (item_) => {
      console.log("handleClickEdit",item_)
      setItem(item_)
      var title = (Number(item.skid)>0) ? "Edit" : "Add";
      setPropsModal({ ...propsModal, isOpen: true, title: title + " Navi" });
    };
    
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
 
    return <div className='boxcol'>
      <div className='boxhead'><button onClick={()=>handleClickEdit({})}>+</button>Navi</div>
      <div className='boxbody'>
      <Loading on={loading} />
      <ItemList items={items} onSelect={onSelect} handleClickEdit={handleClickEdit} />
    </div>

    <AppModal props={propsModal} fnHandleOpen={fnHandleOpen}>
            <ItemEdit item={item} setItem={setItem} fnHandleOpen={fnHandleOpen} setReload={setLoading} items={items}/> 
      </AppModal>
    </div>

}