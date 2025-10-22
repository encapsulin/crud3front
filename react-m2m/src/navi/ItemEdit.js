import '../misc/stylebox.css';
import '../misc/stylebutton.css';
import React, { useState } from 'react';
import Loading from '../loading/Loading';
import { API_BASE_URL } from "../misc/config";
import Tree from './Tree'

export default function ItemEdit({item,setItem,fnHandleOpen,setReload,items}){

    // const [item,setItem] = useState({skid:"0","parentId":"0"})
    console.log("ItemEdit:",item)
    if (!("parentId" in item)) {
      setItem({ ...item, parentId:"0" });
    }
    console.log("item:",item)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    /////////////////////////////
    const handleChange = (e) => {
      setItem({ ...item, [e.target.name]: e.target.value });
    };
    
    ////////////////////////////////////////////
    const handleSubmit = async (e, method_) => {
        e.preventDefault(); 
        setLoading(true);
        try {
          const response = await fetch(API_BASE_URL + "navis", {
            method: method_,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item), 
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("Success:", data);
      
          fnHandleOpen(false);
          setItem({});
          setReload(true)
        } catch (err) {
          console.error("Error submitting form:", err);
          setError(err.message);
        }
        setLoading(false);
      };

    return <div className='boxcol'>
        <Loading on={loading} color={0}/>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

{/* <p>{JSON.stringify(item.skid)}</p> */}

        <form onSubmit={(e) => e.preventDefault()} className='boxcol'>
       
        <select
          name="parentId"
          value={item.parentId}
          onChange={handleChange}
        ><Tree items={items}/></select>
        <input type="text" name="title" 
        value={item.title}
        onChange={(e) => setItem({ ...item, title: e.target.value })}/>
        
        <div className='boxrowspace' style={{marginTop:"10px"}}>
            <button type="submit" onClick={(e) => handleSubmit(e, "DELETE")} disabled={loading} className='btndelete'>Delete</button>
            <button type="button" onClick={() => fnHandleOpen(false)} className='btncancel'>Cancel</button>
            <button type="submit" onClick={(e) => handleSubmit(e, "POST")} disabled={loading} className='btnsubmit'>Submit</button>
        </div>
        </form>
    </div>
}