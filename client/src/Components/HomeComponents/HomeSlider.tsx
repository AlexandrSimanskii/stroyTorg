import { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";


const HomeSlider = () => {
  useEffect(() => {
    new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      speed: 4000,
      // autoplay: {
      //   delay: 5000,
      // },
      pagination: {
        el: ".swiper-pagination",
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <div className="home-banner">
      <div className="swiper">
        <div className="swiper-wrapper">
          <div
            className="swiper-slide "
            style={{
              backgroundImage: `URL("images/image/banner_2.png")`,
            }}
          >
            <div className="banner-inform">
              <h2 className="banner-inform__title">
                Электроинструмент для любых нужд
              </h2>
              <p className="banner-inform__description">
                У нас обновился ассортимент сантехники, мебели для ванной
                комнаты,а так же других сопутствующих товаров.
              </p>
              <button className="banner-inform__btn">
                перейти к товарам{" "}
          
              </button>
            </div>
          </div>

          <div
            className="swiper-slide "
            style={{
              backgroundImage: `URL("images/image/banner.png")`,
            }}
          >
            <div className="banner-inform">
              <h2 className="banner-inform__title">
                Электроинструмент для любых нужд
              </h2>
              <p className="banner-inform__description">
                У нас обновился ассортимент сантехники, мебели для ванной
                комнаты,а так же других сопутствующих товаров.
              </p>
              <button className="banner-inform__btn">
                перейти к товарам 
              </button>
            </div>
          </div>
          <div
            className="swiper-slide "
            style={{
              backgroundImage: `URL("images/image/banner_2.png")`,
            }}
          >
            <div className="banner-inform">
              <h2 className="banner-inform__title">
                Электроинструмент для любых нужд
              </h2>
              <p className="banner-inform__description">
                У нас обновился ассортимент сантехники, мебели для ванной
                комнаты,а так же других сопутствующих товаров.
              </p>
              <button className="banner-inform__btn">
                перейти к товарам 
              </button>
            </div>
          </div>

          <div
            className="swiper-slide "
            style={{
              backgroundImage: `URL("images/image/banner.png")`,
            }}
          >
            <div className="banner-inform">
              <h2 className="banner-inform__title">
                Электроинструмент для любых нужд
              </h2>
              <p className="banner-inform__description">
                У нас обновился ассортимент сантехники, мебели для ванной
                комнаты,а так же других сопутствующих товаров.
              </p>
              <button className="banner-inform__btn">
                перейти к товарам 
              </button>
            </div>
          </div>
        </div>

        <div className="swiper-pagination"></div>
      </div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default HomeSlider;
