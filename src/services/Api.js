import Http from "./Http";

export const getProducts=(config)=>Http.get("products",config);
export const getCategories=(config)=>Http.get("categories",config);
export const getCategorieById=(id,config)=>Http.get(`categories/${id}`,config);
export const getProductsCategory=(id,config)=>Http.get(`categories/${id}/products`,config);
export const getProductById=(id,config)=>Http.get(`products/${id}`,config);
export const getComments=(id,config)=>Http.get(`products/${id}/comments`,config);
export const createComment=(id,data,config)=>Http.post(`products/${id}/comments`,data,config);
export const order=(data)=>Http.post(`order`,data);






