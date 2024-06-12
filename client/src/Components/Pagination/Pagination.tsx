import usePagination from "@mui/material/usePagination";

import { styled } from "@mui/material/styles";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ChangeEvent } from "react";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

type PaginationProps = {
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  countPages: number;
  
};

const Pagination = ({
  setStartIndex,
  limit,
  countPages,
  
}: PaginationProps) => {
  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    if (page >= 1) {
      setStartIndex((page - 1) * limit);
    }
    console.log(event);
    
  };

  const { items } = usePagination({
    count: countPages,
    onChange: handleChange,
  });

  return (
    <nav className="pagination">
      <List sx={{ display: "flex", gap: "10px" }}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = (
              <button
                type="button"
                style={{
                  padding: "19px 24px",
                  borderRadius: "5px",
                  fontWeight: selected ? "bold" : undefined,
                  backgroundColor: selected ? "black" : "transparent",
                  color: selected ? "white" : "black",
                }}
                {...item}
              >
                ...
              </button>
            );
          } else if (type === "page") {
            children = (
              <button
                className={`pagination-btn ${
                  selected ? "pagination-btn--active" : ""
                }`}
                type="button"
                {...item}
              >
                {page}
              </button>
            );
          } else if (type === "previous") {
            children = (
              <button
                className="pagination-btn pagination-btn--hide"
                type="button"
                {...item}
              >
                <FaArrowLeftLong /> Назад
              </button>
            );
          } else if (type === "next") {
            children = (
              <button
                className="pagination-btn pagination-btn--hide"
                type="button"
                {...item}
              >
                Вперед <FaArrowRightLong />
              </button>
            );
          }

          return (
            <li className="pagination-item" key={index}>
              {children}
            </li>
          );
        })}
      </List>
    </nav>
  );
};

export default Pagination;
