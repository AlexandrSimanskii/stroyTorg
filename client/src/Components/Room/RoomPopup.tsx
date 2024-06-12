import { CartProductType } from "../../types/types";

type CartTableProps = {
  prod: CartProductType[];
};

const RoomPopup = ({ prod }: CartTableProps) => {
  return (
    <>
      <div className="room-popup">
        <table className="cart-table">
          <thead className="cart-thead">
            <tr className="cart__top-row">
              <th>Товар</th>
              <th>Цена</th>

              <th>Сумма</th>
            </tr>
          </thead>
          <tbody className="cart-tbody">
            {prod?.map((item) => (
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
                </td>

                <td className="table-product__price--hiden">
                  <div className="cart-table__amount ">
                    <p className="table-product__price ">
                      {(item.discountPrice
                        ? Number(item.discountPrice)
                        : Number(item.regularPrice)) * item.count}{" "}
                      ₽
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RoomPopup;
