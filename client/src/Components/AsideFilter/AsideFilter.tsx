import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RangeInput from "./RangeInput";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import AsideBrand from "./AsideBrand";
import { AsideFilterPropsType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { useState } from "react";

const AsideFilter = ({
  limit,
  sort,
  price,
  setPrice,
  category,

  label,
  setLabel,
  setProducts,
  setCountPages,
}: AsideFilterPropsType) => {
  const [asideOpen, setAsideOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams({
        price: price.join(","),
        label: label.join(","),
        sort: sort.split("_")[0],
        order: sort.split("_")[1],
        category: category || "Инструменты",
        limit: limit.toString(),
      }).toString();

      const res = await fetch(`/api/products/get?${params}`);
      const data = await res.json();
      navigate(`?${params}`);
      setProducts(data.products);
      setCountPages(data.totalPages);
      setAsideOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={() => setAsideOpen(!asideOpen)} className="aside-menu">
        <IoMenu className="aside-menu__icons" /> Показать фильтры
      </button>
      <aside
        className={` ${
          asideOpen ? "aside aside--open " : "aside aside--closed"
        }`}
      >
        <form className="aside-form" onSubmit={handleSubmit}>
          <h3>
            Фильтры <RxCross2 onClick={() => setAsideOpen(false)} />
          </h3>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="price"
              sx={{ fontSize: "18px", fontWeight: "550" }}
            >
              Цена, ₽
            </AccordionSummary>
            <AccordionDetails>
              <div className="range-value-group">
                <div className="range-value">
                  <span>от</span> {}
                  {price[0]}
                </div>
                <div className="range-value">
                  <span>от </span>
                  {}
                  {price[1]}
                </div>
              </div>{" "}
              <RangeInput price={price} setPrice={setPrice} />
            </AccordionDetails>
          </Accordion>
          {/* <AsideCategory category={category} setCategory={setCategory} /> */}

          <AsideBrand label={label} setLabel={setLabel} />

          <Button type="submit" variant="contained" sx={{ marginTop: "30px" }}>
            Применить фильтры
          </Button>
        </form>
      </aside>
      {asideOpen && (
        <span onClick={() => setAsideOpen(false)} className="open"></span>
      )}
    </>
  );
};

export default AsideFilter;
