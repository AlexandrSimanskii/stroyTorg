import { useRef } from "react";
import { LuMenu } from "react-icons/lu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  useAppSelector,
  useAppDispatch,
} from "../../store/redux_hooks/reduxHook";
import {
  setSearchSlice,
  clearSearchSlice,
} from "../../store/SearchSlice/searchSlice";
import { useEffect, useState } from "react";
import ConfirmLogOut from "../ConfirmLogOut/ConfirmLogOut";

const Header = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [quantityCart, setQuantityCart] = useState(0);
  const [quantityFavorite, setQuantityFavorite] = useState(0);
  const user = useAppSelector((state) => state.user);
  const notAuth = useAppSelector((state) => state.notAuth);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleClick = () => {
    if (!user._id) {
      navigate("/signup");
    } else {
      setLogoutVisible(true);
    }
  };

  useEffect(() => {
    if (user._id) {
      setQuantityFavorite(user.favorite.length);
    } else {
      setQuantityFavorite(notAuth.favorite.length);
    }
  }, [user.favorite, notAuth.favorite, user._id]);

  useEffect(() => {
    if (user._id) {
      setQuantityCart(user.cart.length);
    } else {
      setQuantityCart(notAuth.cart.length);
    }
  }, [user.cart, notAuth.cart, user._id]);

  useEffect(() => {
    pathname !== "/catalog" && dispatch(clearSearchSlice());
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [pathname]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    location.pathname !== "/catalog" && navigate("/catalog"),
      dispatch(setSearchSlice(e.target.value));
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-top">
            <div className="header-menu">
              <LuMenu
                className="header-menu__icons"
                onClick={() => setMenuIsOpen(true)}
              />
              <p className="header-menu__text">Меню</p>
            </div>

            <nav
              className={`header-nav ${
                menuIsOpen == true && "header-nav--open"
              }`}
            >
              <ul
                onClick={() => setMenuIsOpen(false)}
                className="header-nav-list"
              >
                {user._id && (
                  <li className="header-nav-list__element">
                    <Link to={"/personroom"}>Личный кабинет</Link>
                  </li>
                )}
                <li className="header-nav-list__element">
                  <Link to={"/about"}>О компании</Link>
                </li>

                <li className="header-nav-list__element">
                  <Link to={"/payment"}>Оплата</Link>
                </li>
                <li className="header-nav-list__element">
                  <Link to={"/delivery"}>Доставка</Link>
                </li>
                <li className="header-nav-list__element">
                  <Link to={"/return"}>Возврат</Link>
                </li>
                <li className="header-nav-list__element">
                  <Link to={"/reviews"}>Отзывы</Link>
                </li>
                <li className="header-nav-list__element">
                  <Link to={"/answear"}>Вопрос-ответ</Link>
                </li>

                <li className="header-nav-list__element">
                  <Link to={"/contacts"}>Контакты</Link>
                </li>
              </ul>
            </nav>
            <div className="header-inform">
              <p className="header-inform__time">Ежедневно, с 8:00 до 18:00</p>
              <p className="header-inform__number">8 800 444 00 65</p>
              <button className="header-inform__button">заказать звонок</button>
            </div>
          </div>

          <div className="header-bottom">
            <Link to={"/"}>
              <img
                className="header-bottom__logo"
                src="/images/image/logo 1.svg "
                alt="logo"
              />
            </Link>

            <div className="header-bottom__group">
              <Link to={"/catalog"}>
                <button className=" header-bottom__btn ">
                  <img src="../../public/images/icons/menu.svg" alt="" />{" "}
                  Каталог
                </button>{" "}
              </Link>
              <form className="header-search-form">
                <input
                  ref={inputRef}
                  className="header-search-input"
                  onChange={handleSearch}
                  type="text"
                />
                <img
                  className="header-search-img"
                  src="../../public/images/icons/search.svg"
                  alt=""
                />
              </form>
            </div>

            <ul className="header-bottom__list">
              <li onClick={handleClick} className="header-bottom__list-element">
                <img
                  className="header-bottom__list-img"
                  src="/images/icons/user.svg"
                  alt="search"
                />
                <p className="header-bottom__list-text">
                  {user._id ? user.username : "Войти"}
                </p>
              </li>

              <li className="header-bottom__list-element">
                <Link to={"/favorite"} className="header-bottom__list-element">
                  <div className="header-img__box">
                    <img
                      className="header-bottom__list-img"
                      src="/images/icons/heart.svg"
                      alt="search"
                    />{" "}
                    {quantityFavorite > 0 && (
                      <span className="quantity">{quantityFavorite}</span>
                    )}
                  </div>
                  <p className="header-bottom__list-text">Избранное</p>
                </Link>
              </li>
              <li className="header-bottom__list-element">
                <Link className="header-bottom__list-element" to={"/cart"}>
                  <div className="header-img__box">
                    <img
                      className="header-bottom__list-img"
                      src="/images/icons/cart.svg"
                      alt="search"
                    />
                    {quantityCart > 0 && (
                      <span className="quantity">{quantityCart}</span>
                    )}
                  </div>

                  <p className="header-bottom__list-text">Корзина</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>{" "}
        {menuIsOpen && (
          <span onClick={() => setMenuIsOpen(false)} className="o"></span>
        )}
      </header>
      {user._id && logoutVisible && (
        <ConfirmLogOut setLogoutVisible={setLogoutVisible} />
      )}
    </>
  );
};

export default Header;
Header;
