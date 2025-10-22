import '../App.css'
import '../misc/stylebox.css';

import React, { useState, useEffect } from 'react';
import { nestItems } from "../misc/nestItems";

export default function Tree({ items }){
    return <>
        {/* <p>{JSON.stringify(items)}</p> */}
        <option value="0" key={0}>/</option>
            {items.map((item) => (
                <TreeItem key={item.id} item={item} />
            ))}
       
    </>
}

function TreeItem({ item, tab=1}){
    return <>
    <option key={item.id} style={{ paddingLeft: `${tab * 20}px` }} value={item.id}>
    {"\u00A0".repeat(tab*5)}
    {item.title}</option>

      {item.children && item.children.length > 0 && (
        <>
          {item.children.map((child) => (
            <TreeItem key={item.id} item={child} tab={tab+1}/>
          ))}
        </>
      )}
      </>
    
}