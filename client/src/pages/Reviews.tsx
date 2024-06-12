import { useEffect, useState } from "react";
import SideBar from "../Components/SideBar/SideBar";
import Pagination from "../Components/Pagination/Pagination";
import Form from "../Components/Contacts/ContactsForm";
import { ReviewType } from "../types/types";

const Reviews = () => {
  const [isSortActive, setIsSortActive] = useState(true);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [order, setOrder] = useState("desc");
  // const [limit, setLimit] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [countPages, setCountPages] = useState(1);

  const sortReviews = (sort: string) => {
    let sortedArray: ReviewType[] = [];
    if (sort === "desc") {
      sortedArray = reviews.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );

      setOrder("desc");
    } else {
      sortedArray = reviews.sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      );
      setOrder("asc");
    }

    setReviews(sortedArray);
  };

  const getReviews = async () => {
    const res = await fetch(
      `/api/review/get?order=${order}&startIndex=${startIndex}`
    );
    const data = await res.json();
    setReviews(data.review);
    setCountPages(data.totalPages);
  };

  useEffect(() => {
    getReviews();
  }, [startIndex]);

  return (
    <div className="reviews">
      <div className="container">
        <div className="delivery-inner">
          <div className="delivery-content">
            <h2 className="delivery-title">Отзывы</h2>
            <div className="reviews-sort">
              <button
                onClick={() => {
                  setIsSortActive(true), sortReviews("desc");
                }}
                className={`reviews-sort__btn  ${
                  isSortActive && "reviews-sort__btn--active"
                }`}
              >
                Сначала новые
              </button>
              <button
                onClick={() => {
                  setIsSortActive(false);
                  sortReviews("asc");
                }}
                className={`reviews-sort__btn  ${
                  !isSortActive && "reviews-sort__btn--active"
                }`}
              >
                Сначала старые
              </button>
            </div>
            <div className="reviews-cards">
              {reviews.length > 0 &&
                reviews.map((item) => (
                  <div key={item._id} className="review-card">
                    <p className="review-card__name">{item.name}</p>
                    <p className="review-card__date">
                      {item.createdAt
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}
                    </p>
                    <p className="review-card__comment">{item.text}</p>
                    <div className="review-card__images">
                      {item.imageUrls?.map((img) => (
                        <img
                          className="review-card__image"
                          key={img}
                          src={img}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            {countPages > 1 && (
              <Pagination
                setStartIndex={setStartIndex}
                limit={10}
                countPages={countPages}
                // setCountPages={setCountPages}
              />
            )}
            {!reviews.length && <p>Пока никто не оставил свой отзыв</p>}
            <Form setReviews={setReviews} />
          </div>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
