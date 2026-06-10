import axios from 'axios';
import type { ProductCategory } from './types';

const ApiUrl='https://localhost:7115/ProductCategories';
export const apiService={
  getCategories:()=>axios.get<ProductCategory[]>(ApiUrl).then(res=>res.data),
  getCategoryById:(id:number)=>axios.get<ProductCategory>(`${ApiUrl}/${id}`).then(res=>res.data),
  createCategory:(category:ProductCategory)=>axios.post<ProductCategory>(ApiUrl,category).then(res=>res.data),
  updateCategory:(id:number, category:ProductCategory)=>axios.put(`${ApiUrl}/${id}`,category),
  deletecategory:(id:number)=>axios.delete(`${ApiUrl}/${id}`)
}