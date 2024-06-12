import Account from "../Components/Register/Account";
import RegisterForm from "../Components/Register/Form";

const SignUp = () => {

  return (
    <div className="register">
      <div className="container">
        <h2>Регистрация</h2>
        <div className="register-content">
          <RegisterForm />
          <Account  />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
