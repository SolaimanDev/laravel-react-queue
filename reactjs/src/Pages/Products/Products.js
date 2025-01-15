import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaEye, FaEdit, FaTrash,FaCheck } from "react-icons/fa"
import Button from "react-bootstrap/Button";
import AuthUser from "../../components/AuthUser";
import { Routes, Route, Link } from "react-router-dom";


export default function Products() {
  const { fetchData, loading, error, data , http} = AuthUser();
  const [products, setProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      await fetchData("/products"); // Fetch products
    };
    loadProducts();
  }, []);

  // Update products whenever `data` changes
  useEffect(() => {
    if (data && data.data) {
      setProducts(data.data);
    }
  }, [data]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      http
        .delete(`/products/${id}`)
        .then(() => {
          setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
          alert("Product deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please try again.");
        });
    }
  };
  const handleStock = (id) => {
    if (window.confirm("Are you sure you want to send Stock Alert mail?")) {
      http
        .get(`/products/check-stock/${id}`)
        .then(() => {
          setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
          alert("Product stock checked successfully!");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to check product. Please try again.");
        });
    }
  };
  

  if (loading)
    return (
      <div>
        {" "}
        <h3>Loading...</h3>{" "}
      </div>
    );
  if (error)
    return (
      <div>
        {" "}
        <h3> Error: {error}</h3>{" "}
      </div>
    );

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Products</h5>
          <div className="mb-3 text-end">
            <Button variant="success" as={Link} to="/products/create">Create</Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {products && products.length > 0 ? (
    products.map((product, index) => (
      <tr key={product.id}>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td>{product.stock}</td>
        <td>
          <Link to={`/products/show/${product.id}`}>
            <Button variant="primary" className="me-2">
              <FaEye className="me-1" />
            </Button>
          </Link>
          <Link to={`/products/edit/${product.id}`}>
            <Button variant="warning" className="me-2">
              <FaEdit className="me-1" />
            </Button>
          </Link>
          <Button
            variant="danger"
            className="me-2"
            onClick={() => handleDelete(product.id)}
          >
            <FaTrash className="me-1" />
          </Button>
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => handleStock(product.id)}
          >
            <FaCheck className="me-1" />
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No products available</td>
    </tr>
  )}
</tbody>

          </Table>
        </div>
      </div>
    </div>
  );
}
