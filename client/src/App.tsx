import { Suspense, lazy } from "react";
import "./style/main.scss";
import Home from "../src/pages/Home.tsx";
import { Route, Routes } from "react-router-dom";
const About = lazy(() => import("./pages/About.tsx"));

const Loyout = lazy(() => import("./Components/Loyout/Layout.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Catalog = lazy(() => import("./pages/Catalog.tsx"));
const Contacts = lazy(() => import("./pages/Contacts.tsx"));
const Reviews = lazy(() => import("./pages/Reviews.tsx"));
const Return = lazy(() => import("./pages/Return.tsx"));
const PaymentPage = lazy(() => import("./pages/PaymentPage.tsx"));
const Delivery = lazy(() => import("./pages/Delivery.tsx"));
const Answear = lazy(() => import("./pages/Answear.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
const Favorite = lazy(() => import("./pages/Favorite.tsx"));
const Checkout = lazy(() => import("./pages/CheckOut.tsx"));
const PersonRoom = lazy(() => import("./pages/PersonRoom.tsx"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>Loading</p>}>
              <Loyout />
            </Suspense>
          }
        >
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/return" element={<Return />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/personroom" element={<PersonRoom />} />
          <Route path="/answear" element={<Answear />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/contacts" element={<Contacts />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
