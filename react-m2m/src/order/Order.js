import '../App.css'
import '../misc/stylebox.css';
import Loading from '../loading/Loading'
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from "../misc/config";
import ItemList from './ItemList'


export default function Order(){

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetch(API_BASE_URL + "orders")
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); 
          })
          .then((data) => {
            setItems(data);      
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }, []); 
    
      if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return <div className='boxcol'>
        <div className='boxhead'>Orders</div>
        <div className='boxbody'>
        <Loading on={loading} />
        <ItemList items={items}/>
    </div></div>
}