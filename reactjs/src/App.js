import "bootstrap/dist/css/bootstrap.min.css";

import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import ProductCreate from './Pages/Products/ProductCreate';
import ProductEdit from './Pages/Products/ProductEdit';
import ProductShow from './Pages/Products/ProductShow';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from "./Pages/Dashboard/Dashboard";

function Header() {
  const {getToken} = AuthUser();
  if(!getToken()){
    return <Guest />
  }
  return (
      <Auth />
  );
}

function App() {
  return (
    <>
       <Header />
     
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
          <Route path="/products/show/:id" element={<ProductShow />} />
          <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
    </>
 );

}

export default App;
