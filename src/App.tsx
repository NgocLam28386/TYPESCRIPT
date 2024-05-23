import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import instance from "./apis";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { TProduct } from "./interfaces/Product";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";
import { createProduct, getProducts, updateProduct } from "./apis/product";
import ProductEdit from "./pages/admin/ProductEdit";

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<TProduct[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  const handleAddProduct = (data: TProduct) => {
    (async () => {
      const newProduct = await createProduct(data);
      setProducts([...products, newProduct]);
      navigate("/admin");
    })();
  };

  const handleEditProduct = (data: TProduct) => {
    (async () => {
      const product = await updateProduct(data);
      setProducts(
        products.map((item) => (item.id === product.id ? product : item))
      );
      navigate("/admin");
    })();
  };

  const handleDelete = (id: number) => {
    (async () => {
      const confirmValue = confirm("Are you sure?");
      if (confirmValue) {
        await instance.delete(`/products/${id}`);
        setProducts(products.filter((item) => item.id !== id && item));
      }
    })();
  };
  return (
    <>
      <div className="app">
        <Header />
        <main className="container" id="main">
          <Routes>
            {/* Client */}
            <Route path="/">
              <Route index element={<Home products={products} />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Admin */}
            <Route path="/admin">
              <Route
                index
                element={<Dashboard products={products} onDel={handleDelete} />}
              />
              <Route
                path="/admin/add"
                element={<ProductAdd onAdd={handleAddProduct} />}
              />
              <Route
                path="/admin/edit/:id"
                element={<ProductEdit onEdit={handleEditProduct} />}
              />
            </Route>

            <Route path="*" element={<Notfound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
