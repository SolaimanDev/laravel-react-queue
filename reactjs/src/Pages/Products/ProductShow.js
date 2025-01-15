import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthUser from "../../components/AuthUser";

export default function ProductShow() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { http } = AuthUser();

  // State variables for product details
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data on component mount
  useEffect(() => {
    http
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data.data); // Set the product details
        setLoading(false); // Loading completed
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        navigate("/products"); // Redirect if product not found
      });
  }, [id, http, navigate]);

  const formattedPrice = (price) => {
    if (isNaN(price) || price === null || price === undefined) {
      return "0.00"; // Default value if price is invalid
    }
    return parseFloat(price).toFixed(2); // Format price to two decimal places
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const { name, price, description, stock, minimum_stock_quantity } = product;

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Product Details</h5>
          <div className="mb-3 text-end">
            <Button variant="success" as={Link} to="/products">
              Back to List
            </Button>
          </div>
          <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
              <div className="card p-4">
                <h1 className="text-center mb-3">Product Details</h1>

                <div className="form-group">
                  <label><strong>Name:</strong></label>
                  <p>{name}</p>
                </div>

                <div className="form-group mt-3">
                  <label><strong>Price:</strong></label>
                  <p>{formattedPrice(product.price)}</p>
                </div>

                <div className="form-group mt-3">
                  <label><strong>Description:</strong></label>
                  <p>{description || "No description available."}</p>
                </div>

                <div className="form-group mt-3">
                  <label><strong>Stock:</strong></label>
                  <p>{stock}</p>
                </div>

                <div className="form-group mt-3">
                  <label><strong>Minimum Stock Quantity:</strong></label>
                  <p>{minimum_stock_quantity}</p>
                </div>

                <div className="text-center mt-4">
                  <Button variant="primary" as={Link} to={`/products/edit/${id}`}>
                    Edit Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
