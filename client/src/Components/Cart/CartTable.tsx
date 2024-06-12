import { RiDeleteBin2Line } from "react-icons/ri";
import { LuMinus } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { CartProductType } from "../../types/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/redux_hooks/reduxHook";
import {
  addInCartNotAuth,
  deleteFromCartNotAuth,
} from "../../store/NotAuth/notAuthSlice";
import {
  addInCartSlice,
  deleteFromCartSlice,
} from "../../store/users/userSlise";

type CartTableProps = {
  cartProducts: CartProductType[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProductType[]>>;
};

const CartTable = ({ cartProducts, setCartProducts }: CartTableProps) => {
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleDeleteFromCart = async (product: CartProductType) => {
    if (user._id) {
      try {
        const res = await fetch(`api/users/${user._id}/cart/delete`, {
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
        setCartProducts((prev) =>
          prev.filter((item) => item._id !== product._id)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(deleteFromCartNotAuth(product._id));
      setCartProducts((prev) =>
        prev.filter((item) => item._id !== product._id)
      );
    }
  };

  const handlePlusProduct = async (product: CartProductType) => {
    if (user._id) {
      try {
        const res = await fetch(`api/users/${user._id}/cart/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentProduct: { _id: product._id, count: ++product.count },
          }),
        });
        const data = await res.json();
        if (data.success == false) {
          return console.log(data.message);
        }

        dispatch(addInCartSlice({ _id: product._id, count: product.count }));
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addInCartNotAuth({ _id: product._id, count: ++product.count }));
    }
  };
  const handleMinusProduct = async (product: CartProductType) => {
    if (user._id) {
      try {
        const res = await fetch(`api/users/${user._id}/cart/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentProduct: { _id: product._id, count: product.count },
          }),
        });
        const data = await res.json();
        if (data.success == false) {
          return console.log(data.message);
        }

        dispatch(addInCartSlice({ _id: product._id, count: product.count }));
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(addInCartNotAuth({ _id: product._id, count: --product.count }));
    }
  };

  return (
    <>
      {cartProducts.length ? (
        <div className="cart-table__wrapper">
          <table className="cart-table">
            <thead className="cart-thead">
              <tr className="cart__top-row">
                <th>Товар</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody className="cart-tbody">
              {cartProducts?.map((item) => (
                <tr key={item._id}>
                  <td className="table-product__inform">
                    <img className="table-product__img" src={item.img} alt="" />
                    <div>
                      <p className="table-product__name">{item.name}</p>
                      <span className="table-product__article">
                        Артикул: {item.article}
                      </span>
                    </div>
                  </td>
                  <td>
                    {
                      <p className="table-product__price ">
                        {item.discountPrice
                          ? item.discountPrice
                          : item.regularPrice}{" "}
                        ₽
                      </p>
                    }
                    <p className="table-product__old-price">
                      {item.discountPrice && `${item.regularPrice}   ₽`}
                    </p>
                  </td>
                  <td className="table-btns">
                    <button
                      onClick={() => {
                        item.count > 1
                          ? handleMinusProduct(item)
                          : handleDeleteFromCart(item);
                      }}
                      className="cart-table__button"
                    >
                      <LuMinus />
                    </button>
                    <span className="table-product__count">{item.count}</span>
                    <button
                      className="cart-table__button"
                      onClick={() => handlePlusProduct(item)}
                    >
                      <IoMdAdd />
                    </button>
                  </td>
                  <td>
                    <div className="cart-table__amount">
                      <p className="table-product__price table-product__price--hiden">
                        {(item.discountPrice
                          ? Number(item.discountPrice)
                          : Number(item.regularPrice)) * item.count}{" "}
                        ₽
                      </p>

                      <RiDeleteBin2Line
                        onClick={() => handleDeleteFromCart(item)}
                        className="table-product__bin"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>В вашей карзине пока нет товаров</p>
      )}
    </>
  );
};

export default CartTable;
