import React from "react";
import ProductItem from "../../shared/components/Product_item";
import { useParams,useSearchParams } from "react-router-dom";
import { getCategorieById, getProductsCategory } from "../../services/Api";
import Pagination from "../../shared/components/Pagination";

const Category = () => {
    const params = useParams();
    const [searchParams,setSearchParams] = useSearchParams();
    const [pages,setPages] = React.useState({});
    const page=searchParams.get('page')||1;
    const id = params.uid;
    const [category, setcategory] = React.useState(null);
    const [productsCategory, setProcutsCategory] = React.useState([]);
    const [totalProducts, setTotalProducts] = React.useState(0);
    const limit = 10;
    React.useEffect(() => {
        getCategorieById(id,{}).then(({data}) =>setcategory(data.data));
        getProductsCategory(id,{
            params:{
                page,
                limit
                
            }
        }).then(({data}) =>{
            setProcutsCategory(data.data.docs)
            setTotalProducts(data.data.items.total)
            setPages(data.data.pages)
        });


    }, [id,page])


    return (
        <>
            <div>
                <div className="products">
                    <h3>{category?.name} (hiện có {totalProducts} sản phẩm)</h3>
                    <div className="product-list card-deck">
                        {productsCategory.map((data) => {
                            return <ProductItem item={data} />
                        })}
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
export default Category;