import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
// import { useState } from "react";

const Footer = () => {
  // const [catalog, setCatalog] = useState(false);
  // const [inform, setInform] = useState(false);

  const catalogCollection = [
    "Общестроительные материалы",
    "Все для сауны и бани",
    "Инструмент",
    "Отделочные материалы",
    "Товары для дома,сада и огорода",
    "Электротовары",
    "Сантехника",
    "Столярные изделия",
    "Спецодежда и средства индивидуальной пожарной защиты",
    "Водо-газоснабжение, отопление, вентиляция",
    "Метизные, такелажные и скобяные изделия",
  ];
  const informationCollection = [
    "О компании",
    "Вопрос-ответ",
    "Оплата",
   
    "Доставка",
    "Контакты",
    "Возврат",
    "Вход/Регистрация",
    "Отзывы",
   
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <img
            className="footer-top__naming-img"
            src="/images/image/logo 1.svg"
            alt="logo"
          />
          <p className="footer-top__naming-text">ООО «Стройоптторг» </p>

          <div className="footer-top__inform-inn">
            <span>ИНН: 0901051787</span>
            <br />
            <span>КПП 090101001</span>
          </div>

          <div className="footer-top__email">
            Email <br />
            <Link to={"/info@stroiopttorg.ru"}>info@stroiopttorg.ru</Link>
          </div>

          <div className="footer-top__call">
            <div className="footer-top__phone">
              <strong>8 800 444 00 65</strong>

              <span>Ежедневно, с 8:00 до 18:00</span>
            </div>
            <button className="footer-top__btn">Заказать звонок</button>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-main-group">
            <div className="footer-main-group__box">
              <p className="footer-main-list-name ">Информация</p>
              <IoIosArrowDown
                onClick={() => {
                  // setInform((prev) => !prev);
                }}
                className="footer-main-list-arrow"
              />
            </div>

            <ul className="footer-main-list__info footer-main-list">
              {informationCollection.map((item,idx) => (
                <li key={idx} className="footer-main-list__item">{item}</li>
              ))}
            </ul>
          </div>

          <div className="footer-main-group">
            <div className="footer-main-group__box">
              <p className="footer-main-list-name">Каталог</p>
              <IoIosArrowDown
                className="footer-main-list-arrow"
                onClick={() => {
                  // setCatalog((prev) => !prev);
                }}
              />
            </div>

            <ul className="footer-main-list__catalog footer-main-list">
              {catalogCollection.map((item,idx) => (
                <li key={idx} className="footer-main-list__item">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-additional">
          <div className="footer-additional-payments">
            <p className="footer-additional-payments-title">
              Мы принимаем <br /> к оплате:
            </p>
            <ul className="footer-additional-payments-list">
              <li>
                <img
                  className="footer-additional-payments__img"
                  src="/images/icons/Visa.svg"
                  alt="bank"
                />
              </li>
              <li>
                <img
                  className="footer-additional-payments__img"
                  src="/images/icons/MasterCard.svg"
                  alt="bank"
                />
              </li>{" "}
              <li>
                <img
                  className="footer-additional-payments__img"
                  src="/images/icons/Sber.svg"
                  alt="bank"
                />
              </li>{" "}
              <li>
                <img
                  className="footer-additional-payments__img"
                  src="/images/icons/Mir.svg"
                  alt="bank"
                />
              </li>{" "}
              <li>
                <img
                  className="footer-additional-payments__img"
                  src="/images/icons/Halva.svg"
                  alt="bank"
                />
              </li>{" "}
              <li>
                <img
                  className="footer-additional-payments__img"
                  src="/images/icons/Tinkoff.svg"
                  alt="bank"
                />
              </li>{" "}
            </ul>
          </div>

          <div className="footer-additional-subscription">
            <p className="r">Подпишитесь на рассылку и будьте в курсе!</p>
            <form className="footer-form">
              <input
                className="footer-form__input"
                type="text"
                placeholder="Ваш email"
              />
              <IoSend />
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2003-2023 Интернет-магазин ООО «Стройоптторг» р/с
            40702810360000102415 <br /> в Ставропольское отделение №5230 ПАО
            Сбербанк, БИК 040702615
          </p>
          <p className="footer-bottom__developer-text">
            Разработка сайта: <br />
            <strong>SIMANSKIY.GROUP</strong>
          </p>
          <p>Политика конфедициальности</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
