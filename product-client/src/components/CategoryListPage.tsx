import { useCallback, useEffect, useState } from "react";
import type { ProductCategory } from "../types";
import { useNavigate } from "react-router-dom";
import { apiService } from "../apiService";

export default function CategoryListPage() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const navigate = useNavigate();
  const loadCategories = useCallback(async () => {
    try {
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    (async () => {
      await loadCategories();
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("are you sure to delete this record")) {
      try {
        await apiService.deletecategory(id);
        loadCategories();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="card shadow p-4 border-0 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark fw-bold mb-0">Product System</h2>
          <span className="text-muted small">Product Mapping</span>
        </div>
        <button
          onClick={() => navigate("/categories/new")}
          className="btn btn-primary px-3 fw-semibold"
        >
          <i className="bi bi-plus-lg me-1"></i>Create New Product
        </button>
      </div>
      {categories.length === 0 ? (
        <div className="text-center">
          <p className="text-secondary mb-0">No Product Found</p>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Category Name</th>
              <th>Product Count/Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cate) => (
              <tr key={cate.productCategoryID}>
                <td>{cate.name}</td>
                <td>
                  <span className="badge bg-secondary">
                   Total Products : {cate.products?.length}
                  </span>
                  {cate.products.length > 0 && (
                    <div className="table-responsive mb-3">
                      <table className="table table-bordered align-middle">
                        <thead className="table-light">
                          <tr>
                            <td>Name</td>
                            <td>Prod. No</td>
                            <td>Price</td>
                            <td>Size</td>
                            <td>Weight</td>
                            <td>Color</td>
                            <td>Stad. Cost</td>
                          </tr>
                        </thead>
                        <tbody>
                          {cate.products.map((p, index) => (
                            <tr key={index}>
                              <td>{p.name}</td>
                              <td>{p.productNumber}</td>
                              <td>{p.listPrice}</td>
                              <td>{p.size}</td>
                              <td>{p.weight}</td>
                              <td>{p.color}</td>
                              <td>{p.standardCost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </td>
                <td>
                 
                <button type="button"  onClick={() => navigate(`/categories/edit/${cate.productCategoryID}`)} className="btn btn-success btn-sm">
              <i className="bi bi-pencil"></i>
                </button>
                  <button type="button" onClick={()=>handleDelete(cate.productCategoryID)}  className="btn btn-danger btn-sm"><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
