import { contactsOffice, contactsRegion } from "../assets/data/contactData";
import Form from "../Components/Contacts/ContactsForm";

const Contacts = () => {
  return (
    <div className="contacts">
      <div className="container">
        <h2> Контакты </h2>
        <section className="contacts-location">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36803.90749846217!2d20.849255434399375!3d54.793251250892084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e3728cece1f9bd%3A0xa021222f874ada0!2z0JfQsNGA0LXRh9GM0LUsINCa0LDQu9C40L3QuNC90LPRgNCw0LTRgdC60LDRjyDQvtCx0LsuLCDQoNC-0YHRgdC40Y8sIDIzODMyMw!5e0!3m2!1sru!2suk!4v1712174007417!5m2!1sru!2suk"
            loading="lazy"
          ></iframe>

          <dl className="location-groups">
            <div className="location-group location-group__location">
              <dt className="location-group__name "> Адрес:</dt>
              <dd className="location-group__description">
                369012, Карачаево-Черкесская Республика, г. Черкесск, ул
                Октябрьская, дом 301
              </dd>
            </div>
            <div className="location-group location-group__phone">
              <dt className="location-group__name">Телефон:</dt>
              <dd className="location-group__description">8 (8782) 28-42-72</dd>
            </div>
            <div className="location-group location-group__post">
              <dt className="location-group__name">Email адрес:</dt>
              <dd className="location-group__description">
                info@stroiopttorg.ru
              </dd>
            </div>
            <div className="location-group">
              <dt className="location-group__name">Время работы:</dt>
              <dd className="location-group__description">
                Ежедневно, с 8:00 до 18:00 <br />
                Без перерыва и выходных
              </dd>
            </div>
            <button className="location-btn ">Заказать звонок </button>
          </dl>
        </section>
        <section className="office">
          <div className="office__cards">
            {Object.entries(contactsOffice).map(([key, value]) => (
              <div className="office__card" key={key}>
                <p>{key}</p>
                <p className="contacts-numbers">{value}</p>
              </div>
            ))}
          </div>
          <div className="office__props">
            <span> Реквизиты: </span>
            <br />
            ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "СТРОЙОПТТОРГ"ИНН
            0901051787КПП 090101001369000, Карачаево-Черкесская республика,
            город Черкесск, Октябрьская улица, 301р/с 40702810360000102415 в
            Ставропольское отделение №5230 ПАО Сбербанк, БИК 040702615
          </div>
        </section>
        <section className="regions">
          <h2>Работаем по регионам:</h2>
          <div className="regions-cards">
            {Object.entries(contactsRegion).map(([key, value]) => (
              <div key={key} className="regions-card">
                <p>{key}</p>
                <p className="contacts-numbers">{value}</p>
                <a href="info@stroiopttorg.ru">info@stroiopttorg.ru</a>
              </div>
            ))}
          </div>
        </section>
        <section className="contact-form-section">
          <h3>У вас есть вопросы? С радостью ответим на них!</h3>
          <Form />
        </section>
      </div>
    </div>
  );
};

export default Contacts;
