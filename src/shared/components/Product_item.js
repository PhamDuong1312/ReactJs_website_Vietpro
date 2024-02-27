import { getImageProduct,VND } from "../../ultils";
import { Link } from "react-router-dom";
const productItem = ({item}) => {
    
    return (<>
        <div className="product-item card text-center">
            <Link to={`/productdetails-${item._id}`}><img src={getImageProduct(item.image)} alt=""/></Link>
            <h4><Link to={`/productdetails`}>{item.name}</Link></h4>
            <p>Giá Bán: <span>{VND.format(item.price)}</span></p>
        </div>
    </>)
}
export default productItem;