import {  useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../store/redux_hooks/reduxHook";
import { FaUserPen } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { TbShieldLock } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import RoomOrder from "../Components/Room/RoomOrder";

import ChangePassword from "../Components/Room/ChangePassword";
import ConfirmLogOut from "../Components/ConfirmLogOut/ConfirmLogOut";
import ChangeProfile from "../Components/Room/ChangeProfile";

const PersonRoom = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [activeList, setActiveList] = useState("Мои заказы");
  const user = useAppSelector((state) => state.user);
  console.log(activeList);

  return (
    <>
      <div className="room">
        <div className="container">
          <h2>Личный кабинет</h2>
          <div className="room-inner">
            {" "}
            <p className="room__welcome">
              Здравствуйте <strong>{user.username}</strong>
            </p>
            <ul className="room-menu">
              <li
                onClick={() => setActiveList("Изменить профиль")}
                className={`room-menu__item ${
                  activeList === "Изменить профиль" && "room-menu__item--active"
                }`}
              >
                <FaUserPen className="room-menu__item-img" />
                Изменить профиль{" "}
              </li>
              <li
                onClick={() => setActiveList("Мои заказы")}
                className={`room-menu__item ${
                  activeList === "Мои заказы" && "room-menu__item--active"
                }`}
              >
                <TbListDetails className="room-menu__item-img" />
                Мои заказы
              </li>
              <li onClick={() => setActiveList("Избранные товары")}>
                <Link className="room-menu__item" to={"/favorite"}>
                  <div className="room-menu__item-box">
                    <IoMdHeartEmpty className="room-menu__item-img" />
                    {user.favorite.length > 0 && (
                      <span className="room-menu__item-favorite">
                        {user.favorite.length}
                      </span>
                    )}
                  </div>
                  Избранные товары
                </Link>
              </li>
              <li
                onClick={() => setActiveList("Сменить пароль")}
                className={`room-menu__item ${
                  activeList === "Сменить пароль" && "room-menu__item--active"
                }`}
              >
                <TbShieldLock className="room-menu__item-img" />
                Сменить пароль
              </li>
              <li
                onClick={() => setLogoutVisible(true)}
                className="room-menu__item"
              >
                {" "}
                <TbLogout className="room-menu__item-img" />
                Выйти из аккаунта
              </li>
            </ul>
            {activeList === "Изменить профиль" && (
              <ChangeProfile  />
            )}
            {activeList === "Мои заказы" && <RoomOrder />}
            {activeList === "Сменить пароль" && (
              <ChangePassword _id={user._id} />
            )}
          </div>
        </div>
        {logoutVisible && <ConfirmLogOut setLogoutVisible={setLogoutVisible} />}
      </div>
    </>
  );
};

export default PersonRoom;
