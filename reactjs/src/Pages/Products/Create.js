import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AuthUser from './AuthUser';
import { Routes, Route, Link } from 'react-router-dom';
import ProductCreate from '../Pages/Poducts/Create';
export default function Products() {
    const { fetchData, loading, error, data } = AuthUser();
    const [products, setProducts] = useState([]);

    // Fetch products when the component mounts
    useEffect(() => {
        const loadProducts = async () => {
            await fetchData('/products'); // Fetch products
        };
        loadProducts();
    }, []); 

    // Update products whenever `data` changes
    useEffect(() => {
        if (data && data.data) {
            setProducts(data.data); 
        }
    }, [data]);

    if (loading) return <div> <h3>Loading...</h3> </div>;
    if (error) return <div> <h3> Error: {error}</h3> </div>;

    return (
        <>
        
       
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Products</h5>
                <div className='mb-3 text-end'>
                <Button variant="success">Create</Button>
                </div>


            </div>
        </div>
                    <div className="container">
                        <Routes>
                            <Route path="/products/create" element={< Create />} />
                        </Routes>
                    </div>
                    </>
    );
}
