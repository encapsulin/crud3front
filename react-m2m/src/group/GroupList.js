import React from "react";


export default function GroupList({ items , onSelect,handleClickEdit}) {
  return (
    <div>
      {items.map((item) => (
        <GroupItem key={item.id} item={item} onSelect={onSelect} handleClickEdit={handleClickEdit}/>
      ))}
    </div>
  );
}

function GroupItem({ item, tab=0, onSelect,handleClickEdit }) {
  return (
    <div style={{ marginLeft: `${20}px`, marginBottom: "5px" }}>
    
      <span className="App-link" onClick={() => onSelect(item.id)} >
        {item.title}
      </span>
      
      <img src='/img/edit.svg' alt='add' onClick={()=>handleClickEdit(item)} className='pointer'/>

      {item.children && item.children.length > 0 && (
        <div>
          {item.children.map((child) => (
            <GroupItem key={child.id} item={child} tab={tab+1} onSelect={onSelect} handleClickEdit={handleClickEdit}/>
          ))}
        </div>
      )}
    </div>
  );
}


