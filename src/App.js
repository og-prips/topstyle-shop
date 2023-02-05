import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import ProductGrid from "./components/ProductGrid";
import ProductView from "./components/ProductView";
import Header from "./components/Header";
import CartView from "./components/CartView";
import AuthProvider from "./contexts/AuthProvider";
import ProductProvider from "./contexts/ProductProvider";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<ProductGrid />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/product/:id" element={<ProductView />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </>
  );
}

export default App;
