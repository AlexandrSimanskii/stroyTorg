import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import { ProductType } from "../../types/types";
import CardProduct from "../CardProduct/ProductCard";
type PropsType = {
  similarProduct: ProductType[];
};

const SimilarProductSlider = ({ similarProduct }: PropsType) => {
  const slidesPerView =
    similarProduct.length < 5 ? similarProduct.length - 1 : 5;
  useEffect(() => {
    new Swiper(".similar-slider", {
      direction: "horizontal",
      slidesPerView: slidesPerView,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      modules: [Navigation],
    });
  }, [similarProduct]);

  return (
    <>
      {similarProduct.length > 1 && (
        <>
          <h4>Похожие товары</h4>
          <div className="similar-slider">
            <div className="swiper-wrapper similar-swiper-wrapper">
              {similarProduct.map((item, idx) => (
                <div key={idx} className="swiper-slide similar-swiper-slide">
                  <CardProduct product={item} />
                </div>
              ))}{" "}
            </div>

            <div className="swiper-button-prev similar-swiper-btn"></div>
            <div className="swiper-button-next similar-swiper-btn"></div>
          </div>
        </>
      )}
    </>
  );
};

export default SimilarProductSlider;
