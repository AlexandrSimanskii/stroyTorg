import { useEffect, useState } from "react";
import AsideFilter from "../Components/AsideFilter/AsideFilter";
import SortFilter from "../Components/AsideFilter/SortFilter";
import CardProduct from "../Components/CardProduct/ProductCard";
import { ProductType } from "../types/types";
import Pagination from "../Components/Pagination/Pagination";


import { useAppSelector, useAppDispatch } from "../store/redux_hooks/reduxHook";
import { getProducts } from "../store/products/productsSlice";
import CardSkeleton from "../Components/CardProduct/CardSkeleton";

const Catalog = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [limit, setLimit] = useState(12);
  const [isProduct, setIsProduct] = useState("");
  const [sort, setSort] = useState("createdAt_desc");
  const [price, setPrice] = useState<number[]>([20, 200000]);
  const [category, setCategory] = useState("");
  const [label, setLabel] = useState<string[]>([]);
  const [countPages, setCountPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const urlSearchParams = new URLSearchParams();

  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.search);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      urlSearchParams.set("searchTerm", searchTerm);
      urlSearchParams.set("startIndex", startIndex.toString());
      urlSearchParams.set("price", price.join(","));
      urlSearchParams.set("label", label.join(","));
      urlSearchParams.set("sort", sort.split("_")[0]);
      urlSearchParams.set("order", sort.split("_")[1]);
      urlSearchParams.set("category", category);
      urlSearchParams.set("limit", limit.toString());

      const res = await fetch(`/api/products/get?${urlSearchParams}`);
      const data = await res.json();
      if (data.success == false) {
        console.log(data.message);
        setLoading(false);
      }

      dispatch(getProducts(data.products));
      setProducts(data.products);

      if (data.product?.length === 0) {
        setIsProduct("Продукты с такими параметрами не найдено.");
      }
      setCountPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getMinMaxPrices = async () => {
    try {
      const res = await fetch("/api/products/prices");
      const data = await res.json();
      setPrice(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMinMaxPrices();
    fetchProducts();
  }, [startIndex, sort, searchTerm]);

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog-inner">
          <AsideFilter
            price={price}
            limit={limit}
            sort={sort}
            setPrice={setPrice}
            label={label}
            setLabel={setLabel}
            category={category}
            setCategory={setCategory}
            setProducts={setProducts}
            setCountPages={setCountPages}
          />
          <div className="catalog-content">
            <SortFilter
              startIndex={startIndex}
              price={price}
              label={label}
              limit={limit}
              setLimit={setLimit}
              category={category}
              sort={sort}
              setSort={setSort}
              products={products}
              setProducts={setProducts}
              setCountPages={setCountPages}
            />
            <div className="catalog-cards">
              {loading &&
                Array.from({ length: limit }, (_, i) => (
                  <CardSkeleton key={i} />
                ))}
              {products.length > 0 &&
                !loading ?
                products.map((product) => (
                  <CardProduct key={product._id} product={product} />
                )):<p>Нет продуктов с такими параметрами!</p>}
            </div>
            {countPages !== 0 ? (
              <Pagination
                setStartIndex={setStartIndex}
                limit={limit}
                countPages={countPages}
              />
            ) : (
              <p>{isProduct}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
