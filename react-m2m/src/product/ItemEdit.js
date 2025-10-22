import '../misc/stylebox.css';
import React, { useEffect,useState } from 'react';
import Loading from '../loading/Loading';
import { API_BASE_URL } from "../misc/config";
import Tree from '../navi/Tree'
import { nestItems } from "../misc/nestItems";

export default function ItemEdit({id,fnHandleOpen,setReload}){

    const [item,setItem] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [parents, setParents] = useState([]);

    useEffect(() => {
        console.log("ItemEdit id:"+id) 
        if (id === 0 || id === "0" || id === "" ) 
            console.log("New Item")
        else
            itemGet(id);
          
          parentsGet();
    }, [id]);

    const itemGet = async (id) => {
      setLoading(true);

        var url = API_BASE_URL + "products?id="+id

        fetch(url)

          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
          })
          .then((data) => {
            setItem(data[0]);   
            setLoading(false);   
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
    }

    const parentsGet = async () => {
      var url = API_BASE_URL + "navis" 

      fetch(url)

        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); 
        })
        .then((data) => {
          var nested = nestItems(data)
          setParents( nested  )
        })
        .catch((err) => {
          setError(err.message);
         
        });
    }

    ///////////////////////////////////
    const handleSubmit = async (e, method_) => {
        e.preventDefault(); 
        setLoading(true);
        try {
          const response = await fetch(API_BASE_URL + "products", {
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
      
          /////////////////////////////
    const handleChange = (e) => {
      setItem({ ...item, [e.target.name]: e.target.value });
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
        ><Tree items={parents}/></select>

        <input type="text" name="title" 
        value={item.title}
        onChange={(e) => setItem({ ...item, title: e.target.value })}/>
        <textarea name='descr' value={item.descr} 
        onChange={(e) => setItem({ ...item, descr: e.target.value })}
        />
        <div className='boxrowright'>€<input type="text" name="price" style={{ width: "50px" }}
            value={item.price}
            onChange={(e) => setItem({ ...item, price: e.target.value })}/>
        </div>

        <div className='boxrowspace' style={{marginTop:"10px"}}>
            <button type="submit" onClick={(e) => handleSubmit(e, "DELETE")} disabled={loading}>Delete</button>
            <button type="button" onClick={() => fnHandleOpen(false)}>Cancel</button>
            <button type="submit" onClick={(e) => handleSubmit(e, "POST")} disabled={loading}>Submit</button>
        </div>
        </form>
    </div>
}