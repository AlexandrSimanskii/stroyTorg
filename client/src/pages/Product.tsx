import InfoBlock from "../Components/InfoBlock/InfoBlock";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "../store/redux_hooks/reduxHook";
import { useEffect, useState } from "react";
import { ProductType } from "../types/types";
import ProductSlider from "../Components/Product/ProductSlider";
import ProductTabs from "../Components/Product/ProductTabs";
import SimilarProductSlider from "../Components/Product/SimilarProductSlider";
import {
  addFavoriteSlice,
  deleteFavoriteSlice,
  addInCartSlice,
  deleteFromCartSlice,
} from "../store/users/userSlise";

const Product = () => {
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [similarProduct, setSimilarProduct] = useState<ProductType[]>([]);
  const params = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const getSimilarProduct = async (el: string) => {
    try {
      const res = await fetch(`/api/products/get?type=${el}`);
      const data = await res.json();
      setSimilarProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getProduct = async () => {
    try {
      const res = await fetch(`/api/products/get/${params.id}`);
      const data = await res.json();
      setProduct(data);

      getSimilarProduct(data.type);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();

    setIsCart(user.cart.some((item) => item._id === params.id));
  }, [params]);

  useEffect(() => {
    setIsFavorite(user.favorite.some((item) => item === params.id));
  }, [user.favorite, params]);

  const addInFavorite = async () => {
    if (user._id) {
      try {
        const res = await fetch("/api/users/favorite/add", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: params.id, user_id: user._id }),
        });
        const data = await res.json();
        if (data.success) {
          return;
        }

        if (params.id) {
          dispatch(addFavoriteSlice(params.id));
        }
        setIsFavorite(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteFromFavorite = async () => {
    try {
      const res = await fetch("/api/users/favorite/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user._id, product_id: params.id }),
      });
      const data = await res.json();
      if (data.success) {
        return;
      }
      if (params.id) {
        dispatch(deleteFavoriteSlice(params.id));
      }
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddInCart = async () => {
    console.log(user._id);

    try {
      const res = await fetch(`/api/users/${user._id}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentProduct: { _id: params.id, count: count },
        }),
      });
      const data = await res.json();
      if (data.success == false) {
        return console.log(data.message);
      }
      if (params.id) {
        dispatch(addInCartSlice({ _id: params.id, count: count }));
      }
      setIsCart(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteFromCart = async () => {
    try {
      const res = await fetch(`/api/users/${user._id}/cart/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: params.id,
        }),
      });
      const data = await res.json();
      if (data.success == false) {
        return console.log(data.message);
      }
      if (params.id) {
        dispatch(deleteFromCartSlice(params.id));
      }
      setIsCart(false);
      setCount(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product">
      <div className="container">
        {product && (
          <div className="product-inner">
            <section className="product-inform">
              <ProductSlider productImages={product.images} />
              <div className="product-params-block">
                <dl className="product-params">
                  {Object.entries(product.characteristics)
                    .slice(0, 6)
                    .map(([key, value]) => (
                      <div key={key} className="product-params__group">
                        <dt>{key}</dt>
                        <div className="product-params__doted"></div>
                        <dd className="product-params__dd">{value}</dd>
                      </div>
                    ))}
                </dl>

                <a className="product-params__btn" href="#tabs">
                  Показать больше
                </a>

                <InfoBlock />
              </div>
              <div className="add-cart">
                <p>Брэнд:{product.label}</p>
                {!product.sale ? (
                  <p className="card-params">{product.regularPrice} ₽</p>
                ) : (
                  <div className="add-cart-box">
                    <p className="add-cart__discount">
                      {product.discountPrice}₽{" "}
                    </p>
                    <span className="add-cart__regular">
                      {product.regularPrice} ₽
                    </span>
                    <span className="add-cart__sale">-{product.sale}%</span>
                  </div>
                )}
                {isCart ? (
                  <p>Есть в вашей карзине.</p>
                ) : (
                  <div className="count-group">
                    <p className="count-group__brand">Количество</p>
                    <div className="count-group-box">
                      <button
                        onClick={() => {
                          count !== 1 && setCount((prev) => prev - 1);
                        }}
                        className="count-group__btn"
                      >
                        -
                      </button>
                      <p>{count}</p>
                      <button
                        onClick={() => setCount((prev) => prev + 1)}
                        className="count-group__btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    isCart ? handleDeleteFromCart() : handleAddInCart();
                  }}
                  className={`add-cart__added   ${
                    isCart ? "add-cart__added--active" : ""
                  }`}
                >
                  {isCart ? "Убрать из карзины" : "Добавить в корзину"}{" "}
                </button>

                <div className="product-box">
                  <div className="add-cart-bottom">
                    {isFavorite ? (
                      <FaHeart
                        onClick={deleteFromFavorite}
                        className="add-cart-bottom__heart add-cart-bottom__heart--active"
                      />
                    ) : (
                      <IoMdHeartEmpty
                        onClick={addInFavorite}
                        className="add-cart-bottom__heart"
                      />
                    )}

                    {isFavorite ? "В избранном" : "В избранное"}
                  </div>
                </div>
              </div>
            </section>
            <ProductTabs product={product} />
            <SimilarProductSlider similarProduct={similarProduct} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
