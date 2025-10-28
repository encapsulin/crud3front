import '../App.css'
import '../misc/stylebox.css';
import './style.css';
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from "../misc/config.js";
import { httpGet } from '../misc/httpGet.js'; 
import { nestItems } from "../misc/nestItems.js";
import Loading from '../loading/Loading.js'
import GroupEdit from './GroupEdit.js';
import GroupList from './GroupList.js'
import AppModal from '../AppModal.js';

export default function Group({ onSelect }){

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
 
    return <div className='box'>
      <div className='boxrowspace-'>
        <b>Groups</b> &nbsp;
        <img src='/img/add.svg' alt='add' onClick={()=>handleClickEdit({})} className='pointer'/>
        </div>
      <div >
      <Loading on={loading} />
      <GroupList items={items} onSelect={onSelect} handleClickEdit={handleClickEdit} />
    </div>

    <AppModal props={propsModal} fnHandleOpen={fnHandleOpen}>
            <GroupEdit item={item} setItem={setItem} fnHandleOpen={fnHandleOpen} setReload={setLoading} items={items}/> 
      </AppModal>
    </div>

}