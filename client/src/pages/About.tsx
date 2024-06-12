import InfoBlock from "../Components/InfoBlock/InfoBlock";
import NewsComp from "../Components/News/NewsComp";

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-us">
          <div>
            <h1 className="title">О компании</h1>
            <p className="about-us-paragraph">
              «Стройоптторг» - крупнейшая оптово-розничная компания по продаже
              строительных и отделочных материалов.
            </p>
            <p className="about-us-paragraph">
              Уже второе десятилетие мы готовы воплотить в реальность Вашу мечту
              о красивом, комфортабельном доме, благоустроенном современном
              офисе, уютной теплой даче, помочь реализовать любые строительные и
              дизайнерские фантазии и с минимальными затратами времени и
              денежных средств.
              <span>
                Вы всегда можете прийти к нам, пройтись по нашим складским и
                торговым площадям, оценить, как мы храним, принимаем и продаем
                товары. Пообщаться с продавцами-консультантами, получить
                консультацию по товарам у менеджеров.
              </span>
              <span>
                Вы также можете всегда пожаловаться нам, спросить совета или
                вернуть не понравившийся товар. Если же Вам что- то не
                понравилось, и Вы остались недовольны нашим сервисом - не
                стесняйтесь сообщать нам об этом. Только так мы сможем понять,
                что делаем что-то не так. И только так мы сможем стать еще
                лучше!
              </span>
              <span>
                Все товары, представленные на сайте, гарантированно есть в
                наличии.
              </span>
              <span>
                Помимо материалов, мы предлагаем своим клиентам самый большой
                набор услуг, которые позволяют значительно упростить процесс
                строительства и ремонта и сделать его легким и комфортным.
              </span>
            </p>
          </div>
          <img src="/images/image/home_description.png" alt="" />
        </div>

        <InfoBlock />
        <div className="history">
          <h2>История ООО “Стройоптторг”</h2>
          <div className="history-group">
            <ul className="history-list">
              <span className="history-list__year">2003</span>
              <h4>
                Компания ООО «Стройоптторг» была зарегистрирована в реестре и
                получила свидетельство о регистрации 1 октября 2003 года.
              </h4>
              <li className="history-list__item">
                Общая площадь земельного участка составляла {}
                <strong>10 000 м² .</strong>
              </li>
              <li className="history-list__item">
                площадь складских помещений <strong>850 м² .</strong>
              </li>
              <li className="history-list__item">
                численность сотрудников {}
                <strong>10 человек.</strong>
              </li>
            </ul>{" "}
            <ul className="history-list">
              <span className="history-list__year">2008</span>
              <h4>
                С годами компания динамично росла и развивалась и уже к 2008 г.
                мы достигли более высоких результатов:
              </h4>
              <li className="history-list__item">
                общая площадь базы составила {}
                <strong>58 000 м² .</strong>{" "}
              </li>
              <li className="history-list__item">
                площадь складских помещений <strong> 5 200 м².</strong>
              </li>
              <li className="history-list__item">
                численность коллектива возросла до {}
                <strong>300 человек.</strong>
              </li>
            </ul>{" "}
            <ul className="history-list">
              <span className="history-list__year">2018</span>
              <h4>
                К своему 15-ти летнему юбилею компания расширила торговые
                площади до 17 805.3 м²
              </h4>
              <li className="history-list__item">
                Торговый центр №1 - {}
                <strong>5 545 м² .</strong>{" "}
              </li>
              <li className="history-list__item">
                Торговый центр№2- <strong> 3 951,2 м² .</strong>
              </li>
              <li className="history-list__item">
                Складские помещения - {}
                <strong>8 308,6 м².</strong>
              </li>
            </ul>{" "}
            <ul className="history-list">
              <h4>
                Компания ООО «Стройоптторг» была зарегистрирована в реестре и
                получила свидетельство о регистрации 1 октября 2003 года.
              </h4>
              <li className="history-list__item">
                Общая площадь земельного участка составляла {}
                <strong>10 000 м² .</strong>{" "}
              </li>
              <li className="history-list__item">
                площадь складских помещений <strong>850 м² .</strong>
              </li>
              <li className="history-list__item">
                численность сотрудников {}
                <strong>10 человек.</strong>
              </li>
            </ul>{" "}
          </div>
        </div>
        <h2>Последние новости</h2>
        <NewsComp />
      </div>
    </div>
  );
};

export default About;
