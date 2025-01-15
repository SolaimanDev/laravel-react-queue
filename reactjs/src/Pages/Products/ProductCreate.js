import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthUser from "../../components/AuthUser";
import { Routes, Route, Link } from "react-router-dom";
export default function ProductCreate() {
  const navigate = useNavigate();
  const { http } = AuthUser();

  // State variables for form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [minimumStockQuantity, setMinimumStockQuantity] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!price || isNaN(price) || price <= 0) newErrors.price = "Enter a valid price.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!stock || isNaN(stock) || stock < 0) newErrors.stock = "Enter a valid stock quantity.";
    if (!minimumStockQuantity || isNaN(minimumStockQuantity) || minimumStockQuantity < 0) {
      newErrors.minimumStockQuantity = "Enter a valid minimum stock quantity.";
    }
    return newErrors;
  };

  const submitForm = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // API call
    http
      .post("/products", {
        name,
        price,
        description,
        stock,
        minimum_stock_quantity: minimumStockQuantity,
      })
      .then(() => {
        navigate("/products");
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Products</h5>
          <div className="mb-3 text-end">
            <Button variant="success" as={Link} to="/products">List</Button>
          </div>
          <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
              <div className="card p-4">
                <h1 className="text-center mb-3">Create Product</h1>

                {/* Name Field */}
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                {/* Price Field */}
                <div className="form-group mt-3">
                  <label>Price:</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {errors.price && <small className="text-danger">{errors.price}</small>}
                </div>

                {/* Description Field */}
                <div className="form-group mt-3">
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && <small className="text-danger">{errors.description}</small>}
                </div>

                {/* Stock Field */}
                <div className="form-group mt-3">
                  <label>Stock:</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter stock quantity"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  {errors.stock && <small className="text-danger">{errors.stock}</small>}
                </div>

                {/* Minimum Stock Quantity Field */}
                <div className="form-group mt-3">
                  <label>Minimum Stock Quantity:</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter minimum stock quantity"
                    value={minimumStockQuantity}
                    onChange={(e) => setMinimumStockQuantity(e.target.value)}
                  />
                  {errors.minimumStockQuantity && (
                    <small className="text-danger">{errors.minimumStockQuantity}</small>
                  )}
                </div>

                <button
                  type="button"
                  onClick={submitForm}
                  className="btn btn-primary mt-4"
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
