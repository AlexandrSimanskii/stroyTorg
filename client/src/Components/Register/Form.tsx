import { useState, useRef } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { signInSuccessSlice } from "../../store/users/userSlise";
import { useAppDispatch } from "../../store/redux_hooks/reduxHook";
type Inputs = {
  email: string;
  phone: string;
  username: string;
  region: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [secondAgreement, setSecondAgreement] = useState(false);
  const requiredMessage = "Обязательно к заполнению";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...rest } = data;

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
      const user = await res.json();
      if (user.success === false) {
        setError("Пользователь с таким Email или номером уже существует");
        setLoading(false);
        return;
      }

      dispatch(signInSuccessSlice(user));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Ошибка при регестрации");
      setLoading(false);
    }
  };

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-box">
        {" "}
        <label className="label">
          Email <span className="contact-label__required">*</span>:
          <input
            className="input"
            placeholder="Введите ваш email адрес"
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
        </label>
        <label className="label">
          Телефон<span className="contact-label__required">*</span>:
          <InputMask
            mask={`+\\7\\(999)-999-99-99`}
            className="input"
            placeholder="+7 (___) ___ - ___ - ___"
            {...register("phone", {
              required: { value: true, message: requiredMessage },

              pattern: {
                message: "Введите все цифры",
                value: /^\+7\(\d{1}\d{2}\)-\d{3}-\d{2}-\d{2}$/,
              },
            })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </label>
      </div>
      <label className="label">
        Имя<span className="contact-label__required">*</span>:
        <input
          className="input"
          placeholder="Ваше полное имя"
          {...register("username", {
            required: { value: true, message: requiredMessage },
          })}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </label>
      <label className="label">
        Регион<span className="contact-label__required">*</span>:
        <input
          className="input"
          placeholder="Ваш регион"
          {...register("region", {
            required: { value: true, message: requiredMessage },
          })}
        />
        {errors.region && <span>{errors.region.message}</span>}
      </label>
      <label className="label">
        Пароль<span className="contact-label__required">*</span>:
        <input
          type={passwordVisible ? "text" : "password"}
          className="input"
          id="password"
          placeholder="Введите пароль"
          {...register("password", {
            required: { value: true, message: requiredMessage },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
              message:
                "Пароль должен содержать латинские буквы в разных регистрах и содержать минимум одну цифру ",
            },
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
        {errors.password && <span>{errors.password.message}</span>}
      </label>
      <label className="label">
        Подтвердите пароль<span className="contact-label__required">*</span>:
        <input
          className="input"
          type={confirmVisible ? "text" : "password"}
          placeholder="Повторите пароль"
          {...register("confirmPassword", {
            validate: (value) =>
              value === password.current || "Пароли не совпадают",
            required: { value: true, message: requiredMessage },
          })}
        />
        <p
          onClick={() => setConfirmVisible((prev) => !prev)}
          className="form__eye"
        >
          {confirmVisible ? "Скрыть" : "Показать"}
        </p>
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </label>
      <label className="checkbox-group">
        <input
          checked={agreement}
          type="checkbox"
          onChange={() => setAgreement(!agreement)}
        />{" "}
        Согласен с условиями обслуживания
      </label>{" "}
      <label className="checkbox-group">
        <input
          checked={secondAgreement}
          type="checkbox"
          onChange={() => setSecondAgreement(!secondAgreement)}
        />{" "}
        Согласен с обработкой персональных данных в соответствии с политикой
        конфиденциальности
      </label>
      <button
        className={
          agreement && secondAgreement ? "form-btn" : "form-btn--disabled"
        }
        type="submit"
      >
        {loading ? "Регистрация..." : "Зарегистрироваться"}
      </button>
      <p>{error}</p>
    </form>
  );
};

export default RegisterForm;
