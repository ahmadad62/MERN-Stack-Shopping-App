import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, sort, filters }) => {

  //fetch data from database
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            // ? `http://localhost:5000/api/products?category${cat}`
            // : 'http://localhost:5000/api/products')
            ? `https://mern-stack-shopping-app-api.onrender.com/api/products?category${cat}`
            : 'https://mern-stack-shopping-app-api.onrender.com/api/products')
        setProducts(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
    // console.log('products',products);
  }, [cat])



  useEffect(() => {
// console.log('products',products);

    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat 
      ? filteredProducts.map((item) => (<Product item={item} key={item.id} />))
      : products.slice(0,8).map((item) => (<Product item={item} key={item.id} />))  // slice in order to show in main page just 8 items
      }
    </Container>
  );
};

export default Products;
