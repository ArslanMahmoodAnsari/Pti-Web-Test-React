import React, { Fragment } from "react";
import Card from './../UI/Card/card';
import './products.css';


const products = ({allProds, loading}) => {

    const getproductsCard = () => {
        return(
            <Fragment>
                {loading ? <div className='Backdrop' />: null}
                {allProds.map(prod => {
                    return (
                        <Card
                          key={prod.product_id[0]}
                          productId={prod.product_id[0]} 
                          productName={prod.product_name[0]}
                          productPrice={prod.unit_price[0]}
                          removeButton={null}
                          imageUrl={`https://www.partechgss.com${prod.product_img[0].replace(/\s/g,'')}`}
                        />)
                })}
            </Fragment>
        )
    }
  return (
    <Fragment>
        {getproductsCard()}
    </Fragment>
  );
};

export default products;
