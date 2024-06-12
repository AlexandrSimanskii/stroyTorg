import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";

import { Link } from "react-router-dom";
import { ProductType } from "../../types/types";
import { useEffect, useState } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../store/redux_hooks/reduxHook";
import {
  addFavoriteSlice,
  deleteFavoriteSlice,
  addInCartSlice,
  deleteFromCartSlice,
} from "../../store/users/userSlise";
import {
  addFavoriteNotAuth,
  addInCartNotAuth,
  deleteFavoriteNotAuth,
  deleteFromCartNotAuth,
} from "../../store/NotAuth/notAuthSlice";

interface CardProductProps {
  product: ProductType;
}

const CardProduct = ({ product }: CardProductProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);
  const user = useAppSelector((state) => state.user);
  const notAuth = useAppSelector((state) => state.notAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user._id) {
      setInCart(user.cart.some((item) => item._id === product._id));
    } else {
      setInCart(notAuth.cart.some((item) => item._id === product._id));
    }
  }, [user.cart, user._id, notAuth.cart, product._id]);

  useEffect(() => {
    if (user._id) {
      setIsFavorite(user.favorite.includes(product._id));
    } else {
      setIsFavorite(notAuth.favorite.includes(product._id));
    }
  }, [user.favorite, user._id, notAuth.favorite, product._id]);

  const addInFavorite = async () => {
    if (user._id) {
      try {
        const res = await fetch("/api/users/favorite/add", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: product._id, user_id: user._id }),
        });
        const data = await res.json();
        if (data.success) {
          return;
        }
        setIsFavorite(true);
        dispatch(addFavoriteSlice(product._id));
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addFavoriteNotAuth(product._id));
      setIsFavorite(true);
    }
  };
  const deleteFromFavorite = async () => {
    if (user._id) {
      try {
        const res = await fetch("/api/users/favorite/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user._id, product_id: product._id }),
        });
        const data = await res.json();
        if (data.success) {
          return;
        }
        dispatch(deleteFavoriteSlice(product._id));
        setIsFavorite(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(deleteFavoriteNotAuth(product._id));
      setIsFavorite(false);
    }
  };

  const handleAddInCart = async () => {
    if (user._id) {
      try {
        const res = await fetch(`/api/users/${user._id}/cart/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentProduct: { _id: product._id, count: 1 },
          }),
        });
        const data = await res.json();
        if (data.success == false) {
          return console.log(data.message);
        }

        dispatch(addInCartSlice({ _id: product._id, count: 1 }));
        setInCart(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addInCartNotAuth({ _id: product._id, count: 1 }));
      setInCart(true);
    }
  };
  const handleDeleteFromCart = async () => {
    if (user._id) {
      try {
        const res = await fetch(`/api/users/${user._id}/cart/delete`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product._id,
          }),
        });
        const data = await res.json();
        if (data.success == false) {
          return console.log(data.message);
        }

        dispatch(deleteFromCartSlice(product._id));
        setInCart(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(deleteFromCartNotAuth(product._id));
      setInCart(false);
    }
  };

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img className="card__img" src={product.images[0]} alt={product.name} />
      </Link>

      <p className="card__article">Брэнд {product.label}</p>
      <h3 className="card__title">{product.name}</h3>
      {!product.sale ? (
        <p className="card-params">{product.regularPrice} ₽</p>
      ) : (
        <p className="card-params">
          <span className="card-params__old-price">
            {product.regularPrice} ₽
          </span>
          {product.discountPrice}₽{" "}
          <span className="card-params__discount-quantity">
            {product.sale}%
          </span>
        </p>
      )}
      <div className="card-bottom">
        {inCart ? (
          <button
            className="card-bottom__btn card-bottom__btn--added"
            onClick={handleDeleteFromCart}
          >
            В корзине
          </button>
        ) : (
          <button className="card-bottom__btn" onClick={handleAddInCart}>
            <HiOutlineShoppingCart /> Купить
          </button>
        )}

        <div className="card-bottom__addition">
          {isFavorite ? (
            <FaHeart
              className="card-bottom__addition-element card-bottom__addition-element--active"
              onClick={deleteFromFavorite}
            />
          ) : (
            <IoMdHeartEmpty
              onClick={addInFavorite}
              className="card-bottom__addition-element "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
