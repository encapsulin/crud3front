import React, { useState, useEffect } from 'react';
import Loading from '../loading/Loading'
import { API_BASE_URL } from "../misc/config";

export default function ItemList({ parentId,handleClick,reload,setReload }) {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null); 

  // const [categ,setCateg] = useState("")

  useEffect(() => {
      setLoading(true);
      var url = API_BASE_URL + "products"
      if(parentId)
        url += "?parentId="+parentId
      // console.log(url);

      fetch(url)

        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); 
        })
        .then((data) => {
          setItems(data);      
          setLoading(false);
          if (data?.[0]?.categ != null) {
            // setCateg(": " +data[0].categ['title']);
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        })

        // setReload(false)
    }, [parentId,reload]); 
  
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="container">    

            <div className=''>&nbsp;&nbsp;&nbsp;Items:&nbsp;
        <img src='/img/add.svg' alt='add' onClick={()=>handleClick(0)} className='pointer'/>
        <Loading on={loading} />
</div>   
       
       <div className='row'>
      {items.map((item) => (
      <div className="col-md-4 mb-3" key={item.id}>
        <Item item={item} handleClick={handleClick} />
      </div>      ))}
      </div>
    </div>
  );
}

function Item({ item,handleClick }) {
  return (
    <div className="boxround boxhover">
       <div className="boxhead">{item.title}
      <img src='/img/edit.svg' alt='add' onClick={()=>handleClick(item.id)} className='pointer'/>


       </div>
       <div className='boxbody'>
       <div style={{fontSize: "0.7em"}}>{item.descr}</div>
       <div className="boxrowspace">
      <div>€{item.price}</div>
      {/* <button onClick={()=>handleClick(item.id)} >...</button> */}
      </div>
      
    </div></div>
  );
}
