import { useLocation, useNavigate } from "react-router-dom";

const Account = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="register-account">
      <h4 className="register-account__title">
        {pathname === "/signup" ? "Уже есть аккаунт?" : "Еще нет аккаунта?"}
      </h4>
      {pathname === "/signup" ? (
        <p className="register-account__text">
          <span>
            {" "}
            Перейдите к <b>авторизации</b> если у вас уже есть
            зарегистрированный аккаунт.
          </span>
        </p>
      ) : (
        <p className="register-account__text">
          <span>
            {" "}
            <b>Регистрация на сайте</b> позволяет получить доступ к статусу и
            истории вашего заказа. Просто заполните поля ниже, и вы получите
            учетную запись.
          </span>
          <span>
            Мы запрашиваем у вас только информацию, необходимую для того, чтобы
            сделать процесс покупки более быстрым и легким.
          </span>
        </p>
      )}

      <button
        className="register-account__btn"
        onClick={() =>
          navigate(pathname === "/signup" ? "/signin" : "/signup")
        }
      >
        {" "}
        {pathname === "/signup" ? "Авторизоваться" : "Зарегистрироваться"}
      </button>
    </div>
  );
};

export default Account;
