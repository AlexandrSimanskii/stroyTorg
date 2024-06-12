import HomeSlider from "../Components/HomeComponents/HomeSlider.tsx";
import { assortiment, catalog } from "../assets/data/homeData";
import AssortimentCard from "../Components/HomeComponents/AssortimentCard.tsx";
import AdvertisingCard from "../Components/Advertisign/AdvertisingCards.tsx";
import { MdKeyboardArrowRight } from "react-icons/md";
import HomeHitSaleSlider from "../Components/HomeComponents/HomeHitSaleSlider.tsx";
import CatalogList from "../Components/HomeComponents/CatalogList.tsx";
import { useEffect, useState } from "react";
import { ProductType } from "../types/types.ts";
import CardProduct from "../Components/CardProduct/ProductCard.tsx";
import { Link, useNavigate } from "react-router-dom";
import InfoBlock from "../Components/InfoBlock/InfoBlock.tsx";
import NewsComp from "../Components/News/NewsComp.tsx";
import { useAppSelector } from "../store/redux_hooks/reduxHook.ts";

const Home = () => {
  const [betterProducts, setBetterProducts] = useState<ProductType[]>([]);
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const getBetterProducts = async () => {
    try {
      const res = await fetch("/api/products/get?limit=5&startIndex=15");
      const data = await res.json();
      setBetterProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBetterProducts();
  }, []);

  console.log(user);

  return (
    <main className="home">
      <div className="container">
        <HomeSlider />
        <section className="home-catalog">
          <InfoBlock />

          <ul className="home-catalog-assortment ">
            {assortiment.map((item, idx) => AssortimentCard(item, idx))}
            <li className="home-catalog-assortment-item">
              <Link to={"/catalog"}>
                {" "}
                <img src="/images/image/card_arrow.png" alt="image" />
                <p>Каталог</p>
              </Link>
            </li>
          </ul>
          <div className="home-catalog-bottom">
            {catalog.map((item, idx) => AdvertisingCard(item, idx))}
          </div>
        </section>
        <section className="home-sale">
          <h2 className="title">Хиты продаж</h2>
          <CatalogList />
          <HomeHitSaleSlider />
        </section>
        <section className="home-brand">
          <div className="container">
            <h2 className="title">Популярные бренды</h2>
            <ul className="home-brand-list">
              <li className="home-brand-list__item">
                <img src="/images/image/keramin.png" alt="keramin" />
              </li>
              <li className="home-brand-list__item">
                <img src="/images/image/ceresit.png" alt="keramin" />
              </li>
              <li className="home-brand-list__item">
                <img src="/images/image/electrolux.png" alt="electrolux" />
              </li>
              <li className="home-brand-list__item">
                <img src="/images/image/bauproffe.png" alt="bauproffe" />
              </li>
              <li className="home-brand-list__item">
                <img src="/images/image/kinplast.png" alt="kinplast" />
              </li>
              <li className="home-brand-list__item">
                <img src="/images/image/oasis.png" alt="oasis" />
              </li>{" "}
              <li className="home-brand-list__item">
                <img src="/images/image/bosch.png" alt="oasis" />
              </li>
            </ul>
          </div>
        </section>
        <section className="home-better">
          <div className="container">
            <h2 className="title">Лучшие предложения</h2>
            <CatalogList />
            <div className="home-better-list">
              {betterProducts?.length &&
                betterProducts.map((product) => (
                  <CardProduct key={product._id} product={product} />
                ))}
            </div>
          </div>
        </section>
        <section className="home-about">
          <div className="home-about__inner">
            <div className="home-about__content">
              <h2 className="title">О нашем магазине</h2>
              <p className="home-about__top-text">
                Цель и главная задача компании создать сервис, который не
                ограничится продажей строительных и отделочных материалов, а
                будет решать задачи и трудности,с которыми сталкиваются люди во
                время ремонта
              </p>
              <dl className="home-description">
                <div className="home-description-group">
                  <dt className="home-description-term home-description-term-area">
                    17805,3 кв.м
                  </dt>
                  <dd className="home-description-definition">
                    торговых и складских <br /> помещений
                  </dd>
                </div>
                <div className="home-description-group">
                  <dt className="home-description-term">50 000+</dt>
                  <dd className="home-description-definition">
                    наименований <br /> товара
                  </dd>
                </div>
                <div className="home-description-group">
                  <dt className="home-description-term">2 500+</dt>
                  <dd className="home-description-definition">
                    постоянных <br /> клиентов
                  </dd>
                </div>
                <div className="home-description-group">
                  <dt className="home-description-term">440</dt>
                  <dd className="home-description-definition">
                    опытных <br /> сотрудников
                  </dd>
                </div>
              </dl>
              <p className="home-about__bottom-text">
                Уже второе десятилетия мы готовы воплотить в реальность Вашу
                мечту о красивом,комфортабельном доме,благоустроенном современом
                офисебуютной теплой даче, помочь реализовать любые строительные
                и дизайнерские фантазии и с минимальными затратами времени и
                денежных средств.
              </p>
              <button
                onClick={() => navigate("/about")}
                className="home-about__btn"
              >
                Подробнее о компании{" "}
                <MdKeyboardArrowRight className="home-about__btn-arrow" />
              </button>
            </div>
            <img src="/images/image/home_description.png" alt="" />
          </div>
        </section>
        <section className="home-news">
          <div className="container">
            <div className="home-news__inner"></div>
            <div className="home-news__group">
              <h2 className="title">Последние новости</h2>
            </div>
            <NewsComp />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
