import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import classes from "./ProductDetails.module.css";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

function ProductDetails() {
  const [products, setProducts] = useState([]);

  const params = useParams();
  const id = params.productId;

  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get(
        "https://fashionkart-ecommerce.herokuapp.com/api/v1/products"
      );
      const { data } = response.data;
      setProducts(data.products);
    };
    loadProducts();
  }, []);

  const productDetail = products.filter((product) => product._id === id);

  return (
    <>
      <div className={classes.layout}>
        {productDetail.map((product) => (
          <div className={classes.container} key={product._id}>
            <div className={classes.imagesContainer}>
              <Carousel className={classes.carousel}>
                <Carousel.Item className={classes.carouselItem}>
                  <img
                    className="w-100 h-100"
                    src={product.images[0]}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="w-100 h-100"
                    src={product.images[1]}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="w-100 h-100"
                    src={product.images[2]}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className={classes.detailsContainer}>
              <h2 className={classes.brand}>{product.brand}</h2>
              <h4 className={classes.name}>{product.name}</h4>
              <h3 className={classes.price}>₹{+product.price}</h3>
              <p className={classes.description}>{product.description}</p>

              <button
                className={classes.btn}
                onClick={() =>
                  cartCtx.addItem({
                    id,
                    name: product.name,
                    price: product.price,
                    amount: 1,
                  })
                }
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductDetails;
