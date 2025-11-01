import './App.css';
import './misc/stylebox.css';

import Group from './group/Group.js'
import Product from './product/Product.js'
import Upload from './upload/Upload.js'

import React, { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState("0");


  return (
    <div className="App">
      <div className='boxhead' style={{ padding: "10px" }}>CRUD</div>

      <header className="App-header">
        <div className='boxrow'>
          <div className='boxcol'>
            <div className="boxround-" ><Group onSelect={setSelectedId} /></div>
          </div>
          <div className="">
            <Product parentId={selectedId} />
            {/* <Upload id={""} /> */}
          </div>

          

        </div>
      </header>

      <span >CRUD-0.1.7</span>
      &nbsp;
      Minima tenetur perferendis. Amet nesciunt eveniet non sequi corporis temporibus a.
    </div>
  );
}

export default App;
