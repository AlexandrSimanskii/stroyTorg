import { catalog } from "../../assets/data/homeData";
import AdvertisingCard from "../Advertisign/AdvertisingCards";

const SideBar = () => {
  return (
    <div className="bar">
      <ul className="bar-cards">
        {catalog.map((item, idx) =>
          idx % 2 !== 0 ? AdvertisingCard(item, idx) : ""
        )}
      </ul>
      <form className="bar-form">
        <h4 className="bar-form__title">Подпишитесь на рассылку</h4>
        <p className="bar-form__text">
          Регулярные скидки и спецпредложения, а так же новости компании.
        </p>
        <input type="text" placeholder="Email" />
        <button className="bar-form__btn">подписаться</button>
        <label className="bar-form__text bar-form__agreement">
          <input type="checkbox" />
          Согласен с обработкой персональных данных в соответствии с политикой
          конфиденциальности
        </label>
      </form>
    </div>
  );
};

export default SideBar;
