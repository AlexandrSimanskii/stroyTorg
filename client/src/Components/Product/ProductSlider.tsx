import { useEffect } from "react";
import Swiper from "swiper/bundle";
import { IoIosArrowDown } from "react-icons/io";
import "swiper/css/bundle";

type ProductSliderType = {
  productImages: string[] | undefined;
};
const ProductSlider = ({ productImages }: ProductSliderType) => {
  useEffect(() => {
    const thumbsSwiper = new Swiper(".product-thumbs", {
      direction: "vertical",
      loop: true,
      navigation: {
        nextEl: ".swiper-btn-button",
      },
      spaceBetween: 20,
      slidesPerView: 6,
    });
    new Swiper(".product-slider", {
      direction: "horizontal",
      loop: true,
      navigation: true,
      spaceBetween: 10,
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }, []);

  return (
    <div className="product-swiper">
      <div className="product-thumbs">
        <div className="swiper-wrapper">
          {productImages?.map((item, id) => (
            <div
              key={id}
              style={{ backgroundImage: `url(${item})` }}
              className="swiper-slide product-thumbs-img"
            ></div>
          ))}
        </div>

        <IoIosArrowDown className=" swiper-btn-button product-thumbs-btn" />
        <span className="product-thumbs__gradient"></span>
      </div>
      <div className="product-slider">
        <div className="swiper-wrapper">
          {productImages?.map((item, idx) => (
            <div
              key={idx}
              style={{ backgroundImage: `url(${item})` }}
              className="swiper-slide product-slider-img"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
