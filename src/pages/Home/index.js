import React from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/Product_item";
const Home = () => {
  const [products,setProducts]=React.useState([]);
  const [productsFetured,setProductsFetured]=React.useState([]);
  React.useEffect(()=>{
    getProducts({
      params:{
        "limit": 6,
     
      }}
    ).then(({data})=>setProducts(data.data.docs));
    getProducts({
      params:{
        "limit": 6,
        "filter[is_featured]":true,
      }
    }).then(({data})=>setProductsFetured(data.data.docs));

  },[])
  console.log(products);
  console.log(productsFetured);

  return (
    <>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {productsFetured.map((data)=>{
            return <ProductItem item={data}/>
          })}
        </div>
        
      </div>
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
        {products.map((data)=>{
            return <ProductItem item={data}/>
          })}
        </div>
        
      </div>



    </>
  )
}
export default Home;