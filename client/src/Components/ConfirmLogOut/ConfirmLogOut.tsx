import { useNavigate } from "react-router-dom";
import { logOutSlise } from "../../store/users/userSlise";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch } from "../../store/redux_hooks/reduxHook";
type Props = {
  setLogoutVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmLogOut = ({ setLogoutVisible }: Props) => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const res = await fetch("/api/signout");
      const data = await res.json();
      if (data === "Пользователь вышел с аккаунта") {
        dispath(logOutSlise());
        navigate("/signin");
        setLogoutVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="logout" onClick={() => setLogoutVisible(false)}>
      <div className="logout-inner">
        <p>Вы точно хотите выйти?</p>
        <button onClick={logOut}>Выйти</button>
        <RxCross2
          onClick={() => setLogoutVisible(false)}
          className="logout-cross"
        />
      </div>
    </div>
  );
};

export default ConfirmLogOut;
