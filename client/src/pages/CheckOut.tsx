import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/redux_hooks/reduxHook";
import { updateUserOrder } from "../store/users/userSlise";
import { useNavigate } from "react-router-dom";
import { ProductOrderType, CartProductType } from "../types/types";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const [productInCart, setProductInCart] = useState<CartProductType[]>([]);
  const [popupTimer, setPopupTimer] = useState(5);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const getToday = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();

    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year} ${formattedHour}:${formattedMinute}`;

    return formattedDate;
  };

  useEffect(() => {
    if (popupTimer < 2) {
      navigate("/");
    }
  }, [popupTimer]);

  const fetchGetUserCartProducts = async () => {
    try {
      const res = await fetch("/api/products/get/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: user.cart }),
      });
      const data = await res.json();
      if (data.success == false) {
        return console.log("Ошибка при получении продуктов");
      }
      setProductInCart(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGetUserCartProducts();
  }, []);
  const {
    watch,
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const pay = watch("pay") || "Наличные";
  const redirect = () => {
    const timer = setInterval(() => {
      setPopupTimer((prev) => {
        if (prev < 2) {
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);
    timer;
  };

  const addOrders = async (data: ProductOrderType) => {
    try {
      const res = await fetch(`api/users/${user._id}/update/order/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders: data }),
      });
      console.log(res);

      setPopup(true);
      dispatch(updateUserOrder(data));
      redirect();
    } catch (error) {
      console.error("Не удалось оформить заказ", error);
    }
  };

  const submitForm = () => {
    const order = {
      order: productInCart.map((item) => ({
        _id: item._id,
        count: item.count,
      })),
      "total price": `${productInCart?.reduce(
        (acc, el) =>
          acc +
          (el.discountPrice
            ? Number(el.discountPrice)
            : Number(el.regularPrice)) *
            el.count,
        0
      )} руб`,
      date: getToday(),
      id: `#${Math.floor(Math.random() * 1000000)}`,
    };
    console.log(order);

    addOrders(order);
  };

  return (
    <section className="checkout">
      <div className="container">
        <div className="checkout__inner">
          <form
            className="checkout-form"
            action="submit"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="checkout-user__inform">
              <div className="form__field">
                <p className="user__inform-title">Данные покупателя</p>
                <input
                  className="checkout-input"
                  {...register("name")}
                  defaultValue={user.username}
                  placeholder="Имя"
                  type="text"
                />
                <input
                  className="checkout-input"
                  {...register("email")}
                  defaultValue={user.email}
                  placeholder="Email"
                  type="email"
                />
                <input
                  className="checkout-input"
                  {...register("number")}
                  defaultValue={user.phone}
                  placeholder="Телефон"
                  type="phone"
                />
              </div>
              <div className="form__field">
                <h5>Адресс покупателя</h5>

                <input
                  className="checkout-input"
                  {...register("city")}
                  placeholder="Город"
                  type="text"
                />
                <input
                  className="checkout-input"
                  {...register("street")}
                  placeholder="Улица"
                  type="text"
                />
                <input
                  className="checkout-input"
                  {...register("home")}
                  placeholder="Дом"
                  type="text"
                />
                <input
                  className="checkout-input"
                  {...register("flat")}
                  placeholder="Квартира"
                  type="text"
                />
              </div>
              <div className="form__field">
                <h5>Коментарии</h5>
                <textarea
                  {...register("info")}
                  placeholder="Дополнительная информация"
                  name="info"
                  cols={30}
                  rows={10}
                ></textarea>
              </div>
            </div>

            <div className="checkout-order__inform">
              <table className="checkout-table">
                <thead className="checkout-thead">
                  <tr>
                    <th>Товар</th>

                    <th>Кол-во</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody className="checkout-tbody">
                  {productInCart?.map((item) => (
                    <tr key={item._id}>
                      <td className="checkout-product__inform">
                        <img
                          className="checkout-product__img"
                          src={item.img}
                          alt=""
                        />
                        <div>
                          <p className="checkout-product__name">{item.name}</p>
                        </div>
                      </td>

                      <td>{item.count}</td>
                      <td>
                        <div className="checkout-table__amount">
                          <p>
                            {(
                              (item.discountPrice
                                ? Number(item.discountPrice)
                                : Number(item.regularPrice)) * item.count
                            ).toLocaleString("en-US")}{" "}
                            ₽
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="checkout__payment">
                <p>Способы оплаты</p>

                <div className="checkout__payment-choice">
                  <label className="checkout-label">
                    Наличные
                    <input
                      {...register("pay")}
                      name="pay"
                      type="radio"
                      value="Наличные"
                      checked={pay === "Наличные"}
                    />
                  </label>
                  <label className="checkout-label">
                    Картой
                    <input
                      {...register("pay")}
                      name="pay"
                      type="radio"
                      value="Банковская карта"
                      checked={pay === "Банковская карта"}
                    />
                  </label>
                </div>

                <button className="checkout-btn">Разместить заказ</button>
              </div>
            </div>
          </form>
        </div>
        {popup && (
          <div className="popup-wrapper">
            <div className="popup">
              <h2>Заказ оформлен</h2>
              <p>
                Через <span>{popupTimer} сек.</span> вас перекинет на главную
                страницу
              </p>
              <button onClick={() => navigate("/")}>Перейти на главную</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;
