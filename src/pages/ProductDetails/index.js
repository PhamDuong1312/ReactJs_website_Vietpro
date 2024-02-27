import { useParams, useSearchParams } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createComment, getComments, getProductById } from "../../services/Api";
import { getImageProduct,VND } from "../../ultils";
import moment from "moment/moment";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import Pagination from "../../shared/components/Pagination";
const ProductDetails = () => {
    
    const params = useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = React.useState({});
    const page = searchParams.get('page') || 1;
    const id = params.uid;
    const [product, setProduct] = React.useState({});
    const [comments, setComments] = React.useState(null);
    const [inputChanges, setInputChanges] = React.useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputChanges({ ...inputChanges, [name]: value });
    }
    const limit = 10;
    const handleSubmit = (e) => {
        e.preventDefault();
        createComment(id, inputChanges, {}).then(({ data }) => {
            if (data.status === "success") {
                setInputChanges(null);
            }
            getComments(id, {
                params: { page, limit }
            }).then(({ data }) => {
                setComments(data.data.docs)
                setPages(data.data.pages)
            });
        })

    }
    const addCart=(type)=>{
        if(product){

            const {_id,name,image,price}=product;
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    _id,name,image,price,
                    qty:1,
                },
            });
        }
        if(type==="buy-now"){
            navigate("/cart");
        }
        
    }
    React.useEffect(() => {
        getProductById(id, {}).then(({ data }) => setProduct(data.data));
        getComments(id, {
            params: { page, limit }
        }).then(({ data }) => {
            setComments(data.data.docs)
            setPages(data.data.pages)
        });
    }, [id, page]);
    return (
        <>
            <div>
                <div id="product">
                    <div id="product-head" className="row">
                        <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                            <img src={getImageProduct(product?.image)} />
                        </div>
                        <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                            <h1>{product?.name}</h1>
                            <ul>
                                <li><span>Bảo hành:</span> 12 Tháng</li>
                                <li><span>Đi kèm:</span> {product?.accessories}</li>
                                <li><span>Tình trạng:</span> {product?.status}</li>
                                <li><span>Khuyến Mại:</span>{product?.promotion}</li>
                                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                                <li id="price-number">{VND.format(product?.price)}</li>
                                {
                                    product?.is_stock ? (
                                        <li className="text text-success" id="status">Còn hàng</li>
                                    ) : (
                                        <li className="text text-danger" id="status">Hết hàng</li>
                                    )
                                }

                            </ul>
                            <div id="add-cart">
                                <button onClick={()=>addCart("buy-now")} className="btn btn-warning mr-2">
                                    Mua ngay
                                </button>

                                <button onClick={addCart} className="btn btn-info">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>

                        </div>
                    </div>
                    <div id="product-body" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Đánh giá về {product?.name}</h3>
                            <p>
                                {product?.details}
                            </p>

                        </div>
                    </div>
                    {/*	Comment	*/}

                    <div id="comment" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Bình luận sản phẩm</h3>
                            <form method="post">
                                <div className="form-group">
                                    <label>Tên:</label>
                                    <input name="name" value={inputChanges?.name || ""} onChange={handleChange} placeholderrequired type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input name="email" value={inputChanges?.email || ""} onChange={handleChange} required type="email" className="form-control" id="pwd" />
                                </div>
                                <div className="form-group">
                                    <label>Nội dung:</label>
                                    <textarea name="content" value={inputChanges?.content || ""} onChange={handleChange} required rows={8} className="form-control" defaultValue={""} />
                                </div>
                                <button type="submit" onClick={handleSubmit} name="sbm" className="btn btn-primary">Gửi</button>
                            </form>
                        </div>
                    </div>
                    {/*	End Comment	*/}
                    {/*	Comments List	*/}
                    {comments?.length && (
                        <div id="comments-list" className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                {comments.map((item) => {
                                    const day = moment(item.createdAt)
                                    return (
                                        <div className="comment-item">
                                            <ul>
                                                <li><b>{item.name}</b></li>
                                                <li>{day.fromNow()}</li>
                                                <li>
                                                    <p>{item.content}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>)
                    }
                    {/*	End Comments List	*/}
                </div>
                {/*	End Product	*/}
                <div id="pagination">
                    <Pagination pages={{ ...pages, limit }} />
                </div>
            </div>

        </>
    )
}
export default ProductDetails;