import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthUser from "../../components/AuthUser";

export default function ProductEdit() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { http } = AuthUser();

  // State variables with default values
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [minimumStockQuantity, setMinimumStockQuantity] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch product data on component mount
  useEffect(() => {
    http
      .get(`/products/${id}`)
      .then((response) => {
        console.log(response.data.data);
        
        const { name, price, description, stock, minimum_stock_quantity } = response.data.data;
        setName(name || ""); // Ensure fallback to an empty string
        setPrice(price || ""); // Ensure fallback to an empty string
        setDescription(description || ""); // Ensure fallback to an empty string
        setStock(stock || ""); // Ensure fallback to an empty string
        setMinimumStockQuantity(minimum_stock_quantity || ""); // Ensure fallback to an empty string
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        navigate("/products"); // Redirect if the product is not found
      });
  }, []);

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

    // API call to update product
    http
      .put(`/products/${id}`, {
        name,
        price,
        description,
        stock,
        minimum_stock_quantity: minimumStockQuantity,
      })
      .then(() => {
        navigate("/products"); // Redirect to product list after updating
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Products</h5>
          <div className="mb-3 text-end">
            <Button variant="success" as={Link} to="/products">
              Back to List
            </Button>
          </div>
          <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
              <div className="card p-4">
                <h1 className="text-center mb-3">Edit Product</h1>

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
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
