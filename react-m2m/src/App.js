import './App.css';
import './misc/stylebox.css';

import Group from './group/Group.js'
import Product from './product/Product.js'
// import Order from './order/Order.js'

import React, { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState("0");

 
  return (
    <div className="App">
      <div className='boxhead' style={{padding:"10px"}}>CRUD</div> 

      <header className="App-header">
        <div className='boxrow'>
        <div className='boxcol'>
          <div className="boxround-" ><Group onSelect={setSelectedId} /></div>
          {/* <div className="boxround-"><Order /></div> */}

          </div>
          <div className="">
            <Product parentId={selectedId} />
          </div>
        </div>
      </header>
      
      <span >CRUD-0.1.5</span>


    </div>
  );
}

export default App;
