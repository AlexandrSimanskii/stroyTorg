import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import SideBar from "../Components/SideBar/SideBar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Delivery = () => {
  useEffect(() => {
    new Swiper(".delivery-Swiper", {
      direction: "horizontal",
      loop: true,
      slidesPerView: 4,
      spaceBetween: 10,
      navigation: {
        nextEl: ".delivery-swiper-button-next",
        prevEl: ".delivery-swiper-button-prev",
      },

      breakpoints: {
        760: {
          slidesPerView: 3,
          spaceBetween: 10,
        },

        1200: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
    });
  }, []);

  return (
    <div className="delivery">
      <div className="container">
        <h2 className="delivery-title">Доставка</h2>
        <div className="delivery-inner">
          <div className="delivery-content">
            <p className="delivery-text">
              Мы всегда готовы доставить приобретенный Вами товар в удобное для
              Вас время. Стоимость доставки товаров определяется исходя из веса,
              габаритов и удаленности до места назначения. Доставка
              осуществляется до подъезда дома, офиса.
            </p>
            <h4>
              Наш интернет-магазин предлагает несколько вариантов получения
              товара:
            </h4>
            <ol>
              <li className="delivery-group">
                <span className="delivery-metod">
                  Самовывоз с территории компании.
                </span>
                <p>
                  Вы можете самостоятельно забрать заказанные товары с наших
                  складов по адресу: г.Черкесск, ул.Октябрьская, 301
                </p>
                <h5>Режим работы:</h5>
                <ul className="ul-type-disc">
                  <li>Понедельник- суббота с 8:00 до 18:00</li>
                  <li>Воскресенье с 8:00 до 17:00</li>
                </ul>
                <p>
                  Отгрузка товара возможна, только после поступления звонка от
                  менеджера о его готовности к выдаче.
                </p>
              </li>

              <li className="delivery-group">
                {" "}
                <span className="delivery-metod">
                  Быстрая доставка по Калининграду и Калининградской области.
                </span>
                <p>
                  <strong>ООО «Стройоптторг»</strong> предлагает быструю и
                  выгодную доставку по г.Калининграду и городам Калининградской
                  области. На отправку интернет-заказов собственным транспортом
                  компании, действует скидка -25%.Доставка товаров весом до 20
                  кг. возможна через сервис «Яндекс Такси» согласно тарифу
                  перевозчика. Мы доставляем заказы с 8:00 до 18:00. Время и
                  день согласовывается с менеджером при оформлении заказа.
                </p>
                <h5> Правила доставки интернет-заказов:</h5>
                <p>
                  {" "}
                  Доставка интернет –заказов осуществляется после полной оплаты
                  (включая стоимость услуги за доставку) на сайте любым удобным
                  для вас способом.
                </p>
                <ul className="ul-type-disc">
                  <li>
                    Производится доставка только после подтверждения о
                    готовности получить товар. В день доставки просим оставаться
                    на связи в согласованное время по указанному в заказе номеру
                    телефона;
                  </li>
                  <li>
                    При доставке просьба обеспечить свободный подъезд к
                    планируемому месту разгрузки.
                  </li>
                  <li>
                    Выгрузка и подъем товара на этаж не входят в стоимость
                    доставки.
                  </li>
                  <li>
                    Прием товара с доставкой определяется по внешнему виду,
                    комплектации, отсутствию механических повреждений в момент
                    доставки.
                  </li>
                </ul>{" "}
                <p className="delivery-warning">
                  После приема товара претензии покупателя, касающиеся
                  комплектации и механических повреждений товара, не
                  принимаются.
                </p>
                Если у Вас возникнут вопросы по качеству или количеству товара,
                Вы можете обратиться за разъяснениями по номеру телефона
                +7(8782)-28-42-72.
              </li>
              <li className="delivery-group">
                <span className="delivery-metod">
                  {" "}
                  Доставка транспортной компанией.
                </span>

                <p>
                  Для доставки интернет-заказов по России, можно воспользоваться
                  услугами транспортных компаний. Только после 100% оплаты и
                  сбора заказа происходит доставка товаров. До терминала
                  транспортных компаний г.Черкесска, мы доставляем ваш
                  заказ-бесплатно. Доставка осуществляется транспортными
                  компаниям «СДЭК» и «ГлавДоставка». При оформлении заказа, Вы
                  можете сообщить менеджеру желаемую транспортную компанию.
                </p>
              </li>
              <li className="delivery-group">
                <span className="delivery-metod"> Почтой России.</span>
                <h5>Способы получения заказа Почтой России:</h5>
                <ul className="ul-type-disc">
                  <li>
                    {" "}
                    Самовывоз из отделения почтовой связи. Ваши заказы
                    доставляются до выбранного почтового отделения
                  </li>
                  <li>Курьером на дом</li>
                </ul>
                После оформления интернет заказа и отправки товаров, Вы получите
                трек-номер, для мониторинга этапов доставки на сайте или в
                мобильном приложении Почты России.
                <br /> Наша компания понимает и ценит Ваше время, поэтому
                оперативная доставка приобретенных товаров, дает возможность как
                можно быстрее завершить ремонт и, наконец, взглянуть с
                восхищением на получившийся результат.
              </li>
            </ol>
          </div>
          <SideBar />
        </div>
        <div className="delivery-Swiper-box">
          <div className="delivery-Swiper">
            <div className="swiper-wrapper">
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_0.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_2.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_1.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_3.png")`,
                }}
              ></div>{" "}
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_0.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_2.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_1.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_3.png")`,
                }}
              ></div>{" "}
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_0.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_2.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_1.png")`,
                }}
              ></div>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_3.png")`,
                }}
              ></div>{" "}
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url("/images/image/delivery_0.png")`,
                }}
              ></div>
            </div>
          </div>
          <div className="delivery-swiper-buttons">
            <div className="delivery-swiper-button-next delivery-swiper-button">
              <MdKeyboardArrowLeft />
            </div>
            <div className="delivery-swiper-button-prev delivery-swiper-button">
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
