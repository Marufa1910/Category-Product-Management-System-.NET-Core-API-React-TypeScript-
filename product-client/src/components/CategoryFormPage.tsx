import React, { useEffect, useState, type SyntheticEvent } from "react";
import type { Product, ProductCategory } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../apiService";
const initialFormState: ProductCategory = { name: "", products: [] };
const initialProductState: Product = {
  name: "",
  productNumber: "",
  color: "",
  standardCost: 0,
  listPrice: 0,
  size: 0,
  weight: 0,
};
export default function CategoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState<ProductCategory>(initialFormState);
  const [currentProduct, setCurrentProduct] =
    useState<Product>(initialProductState);
  useEffect(() => {
    if (isEditing && id) {
      (async () => {
        try {
          const fetchCategory = await apiService.getCategoryById(Number(id));
          setFormData({
            ...fetchCategory,
            products: fetchCategory.products || [],
          });
        } catch (error) {
          console.error(error);
          navigate("/");
        }
      })();
    }
  }, [id, isEditing, navigate]);

  const addProductToCategory = () => {
    if (!currentProduct.name || !currentProduct.productNumber) {
      alert("Product name Number needed");
      return;
    }
    setFormData({
      ...formData,
      products: [...formData.products, currentProduct],
    });
    setCurrentProduct(initialProductState);
  };
  const removeProductsFromCategory = (index: number) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index),
    });
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    try {
      if (isEditing && id) {
        await apiService.updateCategory(Number(id), formData);
      } else {
        await apiService.createCategory(formData);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="card shadow-sm p-4 border-0 bg-white mx-auto"
      style={{ maxWidth: "900px" }}
    >
      <h3 className="h3 border-bottom pb-3 mb-4 text-dark fw-bold">
        {isEditing ? `Edit Category` : "Add New Categoey"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label fw-bold">Category Name</label>
          <input
            placeholder="Enter category name..."
            required
            type="text"
            className="form-control form-control-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <h5 className="mb-3 text-dark fw-bold">
          <i className="bi bi-box me-2"></i>Products
        </h5>
        {formData.products.length > 0 && (
          <div className="table-responsive mb-4 border rounded-3">
            <table className="table table-bordered align-middle mb-0 text-center">
              <thead className="table-light">
                <tr>
                  <th>Product Details</th>
                  <th>Product Number</th>
                  <th>Standard Cost</th>
                  <th>List Price</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Weight</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.products.map((p, index) => (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td>{p.productNumber}</td>
                    <td>{p.standardCost}</td>
                    <td>{p.listPrice}</td>
                    <td>{p.color}</td>
                    <td>{p.size}</td>
                    <td>{p.weight}</td>
                    <td>
                      {" "}
                      <button type="button"
                        onClick={() => removeProductsFromCategory(index)}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="bg-light mb-4">
          <h6>Add Products to list</h6>
          <div className="row g-2 mb-2">
            <div className="col-6">
              <input
                type="text"
                placeholder="Product name"
                className="form-control"
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                placeholder="Product number"
                className="form-control"
                value={currentProduct.productNumber}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, productNumber: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row g-2 mb-2">
            <div className="col-6">
              <input
                type="number"
                placeholder="Size"
                className="form-control"
                value={currentProduct.size||''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, size: Number(e.target.value) })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                placeholder="Weight"
                className="form-control"
                value={currentProduct.weight||''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, weight: Number(e.target.value)})
                }
              />
            </div>
          </div>
           <div className="row g-2 mb-2">
            <div className="col-6">
              <input
                type="number"
                placeholder="Standard Cost"
                className="form-control"
                value={currentProduct.standardCost||''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, standardCost: Number(e.target.value) })
                }
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                placeholder="List price"
                className="form-control"
                value={currentProduct.listPrice|| ''}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, listPrice: Number(e.target.value)})
                }
              />
            </div>
          </div>
            <div className="row g-2 mb-2">
            <div className="col-6">
              <input
                type="text"
                placeholder="Color"
                className="form-control"
                value={currentProduct.color}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, color: e.target.value })
                }
              />
            </div>
            <div className="col-6 mt-4">
             <button  type="button" onClick={addProductToCategory} className="btn btn-primary">Add Product</button> 
            </div>
          </div>
        </div>
         <button type="submit" className="btn btn-primary">Submit category</button>|<button className="btn btn-success" onClick={()=>navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}
