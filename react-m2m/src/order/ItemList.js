import React from "react";

function Item({ item }) {
  return (
    <div className="boxround boxrow boxrowspace boxhover" style={{fontSize: "0.7em", padding: "5px"}}>
       
      <span >{item.createdAt.slice(0, 16)}</span>
      <span>€{item.price}</span>
     
    </div>
  );
}

export default function ItemList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
