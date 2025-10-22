import React from "react";

export default function ItemList({ items , onSelect,handleClickEdit}) {
  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} item={item} onSelect={onSelect} handleClickEdit={handleClickEdit}/>
      ))}
    </div>
  );
}

function Item({ item, tab=0, onSelect,handleClickEdit }) {
  return (
    <div style={{ marginLeft: `${tab * 20}px`, marginBottom: "5px" }}>
      <button onClick={()=>handleClickEdit(item)}>...</button>
      <span className="App-link" onClick={() => onSelect(item.id)} >
        {item.title}
      </span>

      {item.children && item.children.length > 0 && (
        <div>
          {item.children.map((child) => (
            <Item key={child.id} item={child} tab={tab+1} onSelect={onSelect} handleClickEdit={handleClickEdit}/>
          ))}
        </div>
      )}
    </div>
  );
}


