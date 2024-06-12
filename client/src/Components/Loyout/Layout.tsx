import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
