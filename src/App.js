import React, {useState, useEffect} from 'react';
import Button from './components/UI/Button/Button';
import axios from 'axios';
import xml2js from 'xml2js';

import Cart from './components/cart/cart';
import Products from './components/products/products';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    fetchData();
    let temp = localStorage.getItem('cart');
    let totalTemp = localStorage.getItem('total');
    temp = JSON.parse(temp);
    if(temp !== null){
      setCart(temp);
      setTotal(Number(totalTemp));
    }
  }, [])

  const fetchData = async() => {
    setLoading(true);
    try {
      let res = await axios.get ('https://cors-anywhere.herokuapp.com/https://www.partechgss.com/inventory');
      let parser = new xml2js.Parser();
      res = await parser.parseStringPromise(res.data)
      setProducts(res.inventory.product);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  const removeCartProduct = (id) => {
    let newCart = [...cart];
    let temp;
    newCart = newCart.filter( prod => {
      if(prod.id !== id){
        return prod;
      }
      else{
        temp = prod;
        return null;
      }
    })
    setCart(...[newCart]);
    setTotal(Number(total) - Number(temp.quantity)  * Number(temp.price));
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  const drop = (e) =>{
    e.preventDefault();
    let name = e.dataTransfer.getData("name");
    let url = e.dataTransfer.getData("url");
    let price = e.dataTransfer.getData("price");
    let id = e.dataTransfer.getData("id");
    let newCart = [...cart];
    let found = newCart.filter(prod => {
      return prod.id === id ? prod : null
    })
    if(found.length === 1){
      newCart = newCart.map( prod => {
        return prod.id !== id ? prod : ({
          ...prod,
          quantity: prod.quantity + 1
        })
      })
      setCart(...[newCart]);
    }
    else{
      newCart = [...newCart, {id, name, url, price, quantity: 1}]
      setCart(newCart);
    }
    setTotal(Number(total) + Number(price));
  }

  return (
    <div className="App">
      <div className='left'>
        <div className="fetchButton">
        <Button
          children={'Retrive New Inventory'}
          clicked={fetchData}/>
        </div>
        <Products 
          allProds={products}
          loading={loading}/>
      </div>
      <div 
        className='right' 
        onDrop={drop} 
        onDragOver={allowDrop}>
        <Cart 
          cartItems={cart} 
          total={total}
          removeButtonHandler={removeCartProduct}/>
      </div>
      
    </div>
  );
}

export default App;
