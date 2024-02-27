import { Link,useNavigate } from "react-router-dom";
import { UPDATE_CART, DELETE_CART, DELETE_ALL } from "../../shared/constants/action-type";
import { useSelector, useDispatch } from "react-redux";
import { VND, getImageProduct } from "../../ultils";
import { order } from "../../services/Api";
import React from "react"

const Cart = () => {
    const navigate=useNavigate();
    const [inputChanges,setInputChanges]=React.useState({})
    const dispatch = useDispatch();
    const items = useSelector(({ Cart }) => Cart.items);
    const sumPrice = items.reduce((total, item) => item.qty * item.price + total, 0)
    const newItems = items.map((item)=>({prd_id:item._id,qty:item.qty}))
    const onClickOder=(e)=>{
        e.preventDefault();
        if(newItems.length){
            order({
                items:newItems,
                ...inputChanges
            }).then(({data})=>{
                if(data.status ==="success"){
                    dispatch({
                        type: DELETE_ALL
                    })
                    navigate("/cart/buy")
                }
            }).catch(()=>alert("Vui lòng nhập đủ dữ liệu"))
        }else{
            alert("Giỏ hàng hiện đang trống!")
        }
    }
    const onChangeInput=(e)=>{
        const {name,value} = e.target;
        setInputChanges({...inputChanges,[name]:value});
    }
    const onChangeQty = (e, _id) => {
        const qty = parseInt(e.target.value);
        if (qty > 0) {
            dispatch({
                type: UPDATE_CART,
                payload: {
                    _id,
                    qty,
                }
            })
        } else {
            confirmDelete(_id);
        }
    }
    const confirmDelete = (_id) => {
        // eslint-disable-next-line no-restricted-globals
        const isConfirm = confirm("Xóa sản phẩm khỏi giỏi hàng ?");

        if (isConfirm) {
            dispatch({
                type: DELETE_CART,
                payload: {
                    _id,

                }
            })
        }
    }
    const onClickDelete = (e, _id) => {
        e.preventDefault();
        confirmDelete(_id);

    }
    return (
        <>
            <div>
                <div id="my-cart">
                    <div className="row">
                        <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
                        <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
                        <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
                    </div>
                    <form method="post">
                        {items?.map((item) => {
                            return (
                                <div className="cart-item row">
                                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                        <img src={getImageProduct(item.image)} />
                                        <h4>{item.name}</h4>
                                    </div>
                                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                        <input type="number" id="quantity" value={item.qty} onChange={(e) => onChangeQty(e, item._id)} className="form-control form-blue quantity" />
                                    </div>
                                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{VND.format(item.price * item.qty)}</b><a onClick={(e) => onClickDelete(e, item._id)} href="#">Xóa</a></div>
                                </div>
                            )
                        })}
                        <div className="row">
                            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                <button id="update-cart" className="btn btn-success" type="submit" name="sbm">Cập nhật giỏ hàng</button>
                            </div>
                            <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                            <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{VND.format(sumPrice)}</b></div>
                        </div>
                    </form>
                </div>
                {/*	End Cart	*/}
                {/*	Customer Info	*/}
                <div id="customer">
                    <form method="post">
                        <div className="row">
                            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                                <input onChange={onChangeInput} placeholder="Họ và tên (bắt buộc)" type="text" name="name" className="form-control" required />
                            </div>
                            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                                <input onChange={onChangeInput} placeholder="Số điện thoại (bắt buộc)" type="text" name="phone" className="form-control" required />
                            </div>
                            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                                <input onChange={onChangeInput} placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" required />
                            </div>
                            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                                <input onChange={onChangeInput} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" name="address" className="form-control" required />
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <a href="/cart/buy" onClick={onClickOder}>
                                <b>Mua ngay</b>
                                <span>Giao hàng tận nơi siêu tốc</span>
                            </a>
                        </div>
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <a href="#">
                                <b>Trả góp Online</b>
                                <span>Vui lòng call (+84) 0988 550 553</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
export default Cart;