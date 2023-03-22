import "./App.css";
import io from "socket.io-client";
import React,{ useEffect, useState } from "react";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import Carousel from "./Component/Carousel";

const socket = io.connect("http://localhost:3001");
function App() {


  // Messages States
  const [updateData, setUpdateDate] = useState([]);


  useEffect(() => {
    socket.on("api", (data) => {
      setUpdateDate(data)
    });
  }, [socket]);
  return (
   <div>
    <Navbar></Navbar>
    <Carousel></Carousel>
     <div className="max-w-screen-lg mx-auto m-5">
      <h1 className="text-center text-blue-700 text-2xl font-bold my-5">Today's Result</h1>
     {
          <table>
          <tr>
            <th>Company</th>
            <th>Last Price</th>
            <th>Change</th>
            <th>% Change</th>
          </tr>
          {
            updateData.length>0&&updateData.map((item,idx)=>(
              <tr key={idx}>
              <td>{item.Company}</td>
              <td>{item.highPrice}</td>
              
              
              <td>{(item.highPrice-item.lowPrice)>0?
              <h5>+{(item.highPrice-item.lowPrice).toFixed(2)}</h5>
              :<h5 style={{color:'red'}}>{((item.highPrice-item.lowPrice)).toFixed(2)}</h5>
              
            }</td>



              <td>{((item.highPrice-item.lowPrice)*100/item.lowPrice)>0?
              <h5>+{((item.highPrice-item.lowPrice)*100/item.lowPrice).toFixed(2)}%</h5>
              :<h5 style={{color:'red'}}>{((item.highPrice-item.lowPrice)*100/item.lowPrice).toFixed(2)}%</h5>
              
            }</td>
            </tr>
            ))
          }
         
        </table>
        
     }
    </div>
    <Footer></Footer>
   </div>
  );
}

export default App;
