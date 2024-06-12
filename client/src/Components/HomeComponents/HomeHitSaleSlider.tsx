import { useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import ProductCard from "../CardProduct/ProductCard";
import { ProductType } from "../../types/types";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomeHitSaleSlider = () => {
  const [bestseller, setBestseller] = useState<ProductType[]>([]);

  const getBestsellerProduct = async () => {
    try {
      const res = await fetch("/api/products/get?limit=12&startIndex=8");
      const data = await res.json();
      setBestseller(data.products);
    } catch (error) {
      console.error("Ошибка при получении бестселлеров:", error);
    }
  };

  useEffect(() => {
    getBestsellerProduct();
  }, []);

  useEffect(() => {
    const swiper = new Swiper(".slider", {
      direction: "horizontal",
      // loop: true,
      slidesPerView: 1,

      navigation: {
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev",
      },
      breakpoints: {
        1200: {
          slidesPerView: 4,
        },
        800: {
          slidesPerView: 3,
        },
        450: {
          slidesPerView: 2,
        },
      },
    });

    // Очистка экземпляра Swiper при размонтировании компонента
    return () => {
      swiper.destroy();
    };
  }, [bestseller]); // Переинициализация Swiper при изменении бестселлеров

  return (
    <div className="sale-slider">
      <div className="container">
        <div className="sale-slider__inner">
          <div className="slider">
            <div className="swiper-wrapper">
              {bestseller.map((product) => (
                <div className="swiper-slide" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          <div className="slider-buttons">
            <button className="slider-button slider-button-next">
              <ArrowForwardIosIcon className="slider-button-next" />
            </button>
            <button className="slider-button slider-button-prev">
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHitSaleSlider;
