import { useState } from "react";
import { useAppSelector } from "../../store/redux_hooks/reduxHook";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ProductOrderType } from "../../types/types";
import RoomPopup from "./RoomPopup";
const RoomOrder = () => {
  const [popup, setPopup] = useState(false);
  const [prod, setProd] = useState([]);
  const user = useAppSelector((state) => state.user);

  const getOrder = async (item: ProductOrderType) => {
    try {
      const res = await fetch("/api/products/get/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: item.order }),
      });

      const data = await res.json();

      if (data.success == false) {
        return console.log(data.message);
      }
      setProd(data);
      setPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="room-orders">
      <p className="room-caption">Ваши заказы</p>
      {user.order.length > 0 ? (
        <div className="room-table__wrapper">
          <table className="room-table">
            <thead className="room-thead">
              <tr>
                <th>Номер</th>

                <th className="invisible">Дата</th>
                <th className="invisible">Количество</th>
                <th>Итого</th>
              </tr>
            </thead>
            <tbody className="room-tbody">
              {user.order?.map((item, id) => (
                <tr key={id}>
                  <td>{item.id}</td>

                  <td className="invisible">{item.date}</td>
                  <td className="invisible">
                    {item.order.reduce((acc, el) => acc + el.count, 0)}
                  </td>
                  <td className="room__total-price">
                    <p>{item["total price"]}</p>
                    <MdKeyboardArrowRight
                      onClick={() => getOrder(item)}
                      className="room__total-arrow"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Пока вы не чего не приобретали</p>
      )}

      {popup && (
        <>
          <RoomPopup prod={prod} />{" "}
          <span onClick={() => setPopup(false)} className="popup-back"></span>
        </>
      )}
    </div>
  );
};

export default RoomOrder;
