import React from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/Product_item";
import Pagination from "../../shared/components/Pagination";
const Search = () => {
    const limit=9;
    const [pages,setPages]=React.useState({});
    const [searchParams,setSearchParams] = useSearchParams();
    const keyword =searchParams.get("keyword");
    const page=searchParams.get("page")||1;
    const [products,setProducts] = React.useState([]);
    console.log(keyword);
    React.useEffect(()=>{
       getProducts({
        params: {
            limit,
            page,
            name: keyword,
        },
       }).then(({data})=>{setProducts(data.data.docs)
        setPages(data.data.pages)
    })
    },[keyword,page])
    return (
        <>
            <div>
                <div className="products">
                    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
                    <div className="product-list card-deck">
                        {products.map(data=><ProductItem item={data}/> )}
                        
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <Pagination pages={{...pages,limit}}/>
                </div>
            </div>

        </>
    )
}
export default Search;