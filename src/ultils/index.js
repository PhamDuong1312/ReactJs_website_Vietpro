import { Base_URL } from "../shared/constants/app";
export const getImageProduct=(imageName)=>{
    return `${Base_URL}assets/uploads/products/${imageName}`;
}
export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});