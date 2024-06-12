
import { useState, useRef, useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  qurrentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
type Props = {
  _id: string;
};

const ChangePassword = ({ _id }: Props) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const requiredMessage = "Обязательно к заполнению";

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data);

    try {
      const res = await fetch(`/api/users/${_id}/password/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.qurrentPassword,
          newPassword: newPassword.current,
        }),
      });
      const user = await res.json();
      console.log(user);

      if (user.success === false) {
        setError(user.message);
        setLoading(false);

        return;
      }
      reset();
      setMessage("Пароль изменен");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const newPassword = useRef({});
  newPassword.current = watch("newPassword");

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 1500);
  }, [message, error]);

  return (
    <div className="room__password">
      <h3 className="room__password-title">Сменить пароль</h3>
      <form className="room__password-table" onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <label className="label">
          Текущий пароль<span className="contact-label__required">*</span>:
          <input
            type={passwordVisible ? "text" : "password"}
            className="input"
            id="password"
            placeholder="Введите пароль"
            {...register("qurrentPassword", {
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
          {errors.qurrentPassword && (
            <span>{errors.qurrentPassword.message}</span>
          )}
        </label>
        <label className="label">
          Новый пароль<span className="contact-label__required">*</span>:
          <input
            type={passwordVisible ? "text" : "password"}
            className="input"
            id="password"
            placeholder="Введите пароль"
            {...register("newPassword", {
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
          {errors.newPassword && <span>{errors.newPassword.message}</span>}
        </label>{" "}
        <label className="label">
          Подтвердите пароль<span className="contact-label__required">*</span>:
          <input
            className="input"
            type={confirmVisible ? "text" : "password"}
            placeholder="Повторите пароль"
            {...register("confirmPassword", {
              validate: (value) =>
                value === newPassword.current || "Пароли не совпадают",
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
        <button
          disabled={!isValid}
          onClick={() => {
            console.log(error);
          }}
          className={`signin-auth-btn ${
            isValid ? "" : "signin-auth-btn--disabled"
          }   `}
        >
          {loading ? "Загрузка" : "Изменить"}
        </button>
        <p>{message ? message : error}</p>
      </form>
    </div>
  );
};

export default ChangePassword;
