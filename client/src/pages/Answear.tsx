import Accardion from "../Components/Accardion/Accardion";
import SideBar from "../Components/SideBar/SideBar";

import { askAnswearData } from "../assets/data/returnData";

const Answear = () => {
  return (
    <div className="paiment">
      <div className="container">
        <h2 className="delivery-title">Вопрос-ответ</h2>
        <div className="delivery-inner">
          <div className="delivery-content">
            <div className="return-accardion">
              {askAnswearData.map((data, idx) => (
                <Accardion key={idx} data={data} />
              ))}
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Answear;
