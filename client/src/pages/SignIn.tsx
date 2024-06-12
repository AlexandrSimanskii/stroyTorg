import Account from "../Components/Register/Account";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../store/redux_hooks/reduxHook";
import { signInSuccessSlice } from "../store/users/userSlise";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const requiredMessage = "Обязательно к заполнению";
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await res.json();

      if (user.success === false) {
        setError(user.message);
        setLoading(false);
        return;
      }

      console.log(user);
      dispatch(signInSuccessSlice(user));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h2>Авторизация</h2>
        <div className="register-content">
          <form
            action="submit"
            className="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="label">
              Email <span className="contact-label__required">*</span>:
              <input
                className="input"
                placeholder="Email или логин *:"
                {...register("email", {
                  required: { value: true, message: requiredMessage },
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    message: "Неверный формат email адреса",
                  },
                })}
              />
              {errors.email && <span>{errors.email.message}</span>}
              {error && <p>{error}</p>}
            </label>{" "}
            <label className="label">
              Пароль<span className="contact-label__required">*</span>:
              <input
                type={passwordVisible ? "text" : "password"}
                className="input"
                id="password"
                placeholder="Введите пароль"
                {...register("password", {
                  required: { value: true, message: requiredMessage },

                  minLength: {
                    value: 6,
                    message: "Длинна должна быть не менее 6 символов",
                  },
                })}
              />
              <p
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="form__eye"
              >
                {passwordVisible ? "Скрыть" : "Показать"}
              </p>
              <p />
              {error && <p>{error}</p>}
              {errors.password && <span>{errors.password.message}</span>}
            </label>
            <button
              disabled={!isValid}
              onClick={() => {
                console.log(error);
              }}
              className={`signin-auth-btn ${
                isValid ? "" : "signin-auth-btn--disabled"
              }   `}
            >
              {loading ? "загрузка" : "войти"}
            </button>
          </form>
          <Account />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
