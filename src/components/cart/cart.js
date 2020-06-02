/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from 'react';
import Card from './../UI/Card/card';
import Button from './../UI/Button/Button';
import './cart.css';

const cart = ({ cartItems, removeButtonHandler, total }) => {
    const saveDataToLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('total', JSON.stringify(total));
    }
    const mapCartItemsToCard = () => {
        if (cartItems.length >= 1) {
            return (
                <Fragment>
                    {cartItems.map(item => {
                        return (
                            <Card
                                key={item.id}
                                productId={item.id}
                                productName={item.name}
                                productQuantity={item.quantity}
                                productPrice={item.price}
                                imageUrl={item.url}
                                removeButton={removeButtonHandler} />
                        )
                    })
                    }
                </Fragment>
            )
        }
    }
    return (
        <Fragment>
            {mapCartItemsToCard()}
            <div style={{
                float: 'right',
                marginRight: '10px',
            }}>
                {cartItems.length >= 1 ? <Button
                    children={'Checkout'}
                    clicked={saveDataToLocalStorage} /> : null}
            </div>
            <div>
                <h2 className={'totalHeading'}>Cart Total:
                <span className={'total'}>${total}</span>
                </h2>
            </div>
        </Fragment>
    )
};

export default cart;