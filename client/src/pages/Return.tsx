import Accardion from "../Components/Accardion/Accardion";
import SideBar from "../Components/SideBar/SideBar";

import { returnData } from "../assets/data/returnData";

const Return = () => {
  return (
    <div className="paiment">
      <div className="container">
        <h2 className="delivery-title">Возврат</h2>
        <div className="delivery-inner">
          <div className="delivery-content">
            <p>
              Возврат или обмен товара надлежащего качества, возможен в течение
              14 дней с момента покупки в соответствие со ст.26.1 Закона «О
              защите прав потребителей», сохранивший товарный вид и
              потребительские свойства при наличии документов:
            </p>
            <ul className="ul-type-disc">
              <li>подтверждающих покупку и оплату товара;</li>
              <li>документа подтверждающего личность.</li>
            </ul>
            <p>
              Для этого достаточно приехать в часы работы наших складов и ТЦ и
              оформить возврат. <br /> Возврат товара возможен без упаковки, но
              при условии сохранения всей комплектации и потребительских свойств
              товара. <br /> Возврат денежных средств за товар оплаченных
              банковской картой, осуществляется на ту же карту. <br /> При
              заказе товара с доставкой вы можете отказаться от заказа до его
              передачи. Если же машина с вашим заказом уже выехала на адрес, мы
              вернем вам стоимость товара за исключением расходов на доставку.{" "}
              <br /> Ограничения по возврату товара <br /> Мы не принимаем на
              возврат товары, имеющие индивидуально-определенные свойства, если
              указанный товар может быть использован исключительно потребителем,
              который купил его. <br /> Например, товары под заказ, колерованная
              краска, строительные и отделочные материала отпускаемые на метраж,
              уцененный товар, а так же все виды заказного материала.
            </p>

            <h6>Обращение по гарантии</h6>
            <div className="return-accardion">
              {returnData.map((data, idx) => (
                <Accardion key={idx} data={data} />
              ))}
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Return;
