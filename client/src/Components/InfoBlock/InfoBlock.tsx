import { useLocation } from "react-router-dom";

const InfoBlock = () => {
  const { pathname } = useLocation();

  return (
    <div className="info">
      {pathname === "/about" && <h2>Почему именно мы </h2>}
      <ul className="info__inner">
        <li className="info-item">
          <img src="/images/icons/wallet.svg" alt="wallet" />{" "}
          <p className="info-item__group">
            Оплата любым удобным способом
            {pathname === "/about" && (
              <span>
                Выбирайте любой способ оплаты для максимального комфорта при
                покупках у нас.
              </span>
            )}
          </p>
        </li>
        <li className="info-item">
          <img src="/images/icons/choice.svg" alt="choice" />
          <p className="info-item__group">
            Большой выбор товаров в каталоге{" "}
            {pathname === "/about" && (
              <span>
                Наш каталог насыщен разнообразными товарами, чтобы удовлетворить
                ваши потребности.
              </span>
            )}
          </p>
        </li>
        <li className="info-item">
          <img src="/images/icons/box.svg" alt="box" />
          <p className="info-item__group">
            {" "}
            Осуществляем быструю доставку{" "}
            {pathname === "/about" && (
              <span>
                Мы оперативно доставим ваш заказ, чтобы вы могли насладиться
                покупкой как можно скорее.
              </span>
            )}
          </p>
        </li>
        <li className="info-item">
          <img src="/images/icons/percent.svg" alt="percent" />
          <p className="info-item__group">
            Делаем скидки на крупные покупки
            {pathname === "/about" && (
              <span>
                Наша система скидок работает для вашей выгоды, чем больше купили
                - больше сэкономили.
              </span>
            )}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default InfoBlock;
