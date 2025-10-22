import './App.css';
import './misc/stylebox.css';

import Navi from './navi/Navi.js'
import Product from './product/Product.js'
import Order from './order/Order.js'

import React, { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState("0");

 
  return (
    <div className="App">
      <div className='boxhead' style={{padding:"10px"}}>CRUD</div> 

      <header className="App-header">
        <div className='boxrow'>
        <div className='boxcol'>
          <div className="boxround"><Navi onSelect={setSelectedId} /></div>
          <div className="boxround"><Order /></div>

          </div>
          <div className="boxround">
            <Product parentId={selectedId} />
          </div>
        </div>
      </header>
      
      <span >CRUD-0.1.4</span>


    </div>
  );
}

export default App;
