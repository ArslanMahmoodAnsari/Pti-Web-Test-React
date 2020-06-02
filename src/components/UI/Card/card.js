import React, { Fragment } from "react";
import Button from './../Button/Button';
import './card.css';


const card = ({productName, imageUrl, productPrice, productId, productQuantity, removeButton}) => {
  const startDrag = (e, url, name, price, id) => {
    e.dataTransfer.setData('url', url);
    e.dataTransfer.setData('name', name);
    e.dataTransfer.setData('price', price);
    e.dataTransfer.setData('id', productId);
  }
  return (
    <Fragment>
        {
            removeButton === null ? (
                <div 
                 className="card" 
                 draggable="true" 
                 onDragStart={(event) => startDrag(event, imageUrl, productName, productPrice, productId)}>
                <div className="card-text">
                  <img className="portada" src={imageUrl} alt="product" />
                  <div className="title">
                    <h2> {productName} </h2>
                    <p> In Stock </p>
                  </div>
                  <div></div>
                  <h2 className="price">${productPrice}</h2>
                </div>
              </div>
            ): (
                <div 
                 className="cartCard" 
                 draggable="true" 
                 onDragStart={(event) => startDrag(event, imageUrl, productName, productPrice, productId)}>
                <div className="cart-card-text">
                  <img className="portada" src={imageUrl} alt="product" />
                  <div className="title">
                    <h2> {productName} </h2>
                    <p> Qty: {productQuantity} </p>
                  </div>
                  <div className="last">
                    <Button 
                    children={'Remove'}
                    clicked={() => removeButton(productId)}/>
                    <h2 className="price">${productPrice}</h2>
                  </div>
                </div>
              </div>
            )
        }
    </Fragment>
  );
};

export default card;
