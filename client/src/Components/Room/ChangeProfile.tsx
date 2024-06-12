import { useState, useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";
import { updateUser } from "../../store/users/userSlise";
import {
  useAppSelector,
  useAppDispatch,
} from "../../store/redux_hooks/reduxHook";

type Inputs = {
  email: string;
  phone: string;
  username: string;
  region: string;
};

const ChangeProfile = () => {
  const curentUser = useAppSelector((state) => state.user);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,

    handleSubmit,

    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${curentUser._id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await res.json();

      if (user.success === false) {
        setError(user.message);
        setLoading(false);
        setError(user.message);
        return;
      }

      dispatch(updateUser(user));
      setMessage("Данные изменены");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
        <div className="form-box">
          {" "}
          <label className="label">
            Email :
            <input
              defaultValue={curentUser.email}
              className="input"
              placeholder="Введите ваш email адрес"
              {...register("email", {
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
            Номер телефона:
            <InputMask
              defaultValue={curentUser.phone}
              mask={`+\\7\\(999)-999-99-99`}
              className="input"
              placeholder="+7 (___) ___ - ___ - ___"
              {...register("phone", {
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
          Имя:
          <input
            className="input"
            defaultValue={curentUser.username}
            placeholder="Ваше полное имя"
            {...register("username", {})}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </label>
        <label className="label">
          Регион:
          <input
            defaultValue={curentUser.region}
            className="input"
            placeholder="Ваш регион"
            {...register("region", {})}
          />
          {errors.region && <span>{errors.region.message}</span>}
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

export default ChangeProfile;
