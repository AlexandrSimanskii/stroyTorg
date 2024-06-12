import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/redux_hooks/reduxHook";
import { CartProductType } from "../types/types";
import CartTable from "../Components/Cart/CartTable";

const Cart = () => {
  const user = useAppSelector((state) => state.user);
  const notAuth = useAppSelector((state) => state.notAuth);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const navigate = useNavigate();
  const getCartProduct = async () => {
    try {
      const res = await fetch("/api/products/get/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: user._id ? user.cart : notAuth.cart }),
      });

      const data = await res.json();
      if (data.success === false) {
        return console.log(data.message);
      }

      setCartProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartProduct();
  }, []);

  return (
    <div className="cart">
      <div className="container">
        <h2 className="cart-title">Корзина товаров</h2>
        <div className="cart-inner">
          <CartTable
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
          />
          <div className="cart-bar">
            <h4>Итого</h4>
            <div className="product-params__group">
              <dt>Скидка от суммы товара</dt>
              <div className="product-params__doted"></div>
              <dd className="product-params__dd">0</dd>
            </div>
            <div className="product-params__group">
              <dt>Сумма</dt>
              <div className="product-params__doted"></div>
              <dd className="product-params__dd">
                {cartProducts.reduce(
                  (acc, el) =>
                    acc +
                    (el.discountPrice
                      ? Number(el.discountPrice) * el.count
                      : Number(el.regularPrice) * el.count),
                  0
                )}{" "}
                р
              </dd>
            </div>
            <button
              onClick={() => {
                user.cart.length && navigate("/checkout");
              }}
              className={` ${user.cart.length > 0 && "cart-bar__btn"}`}
            >
              {user.cart.length > 0 && "Перейти к оформлению"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
