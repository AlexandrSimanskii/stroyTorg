import { NewsType } from "../../types/types.js";

const NewsCard: React.FC<{ data: NewsType }> = ({ data }) => {
  return (
    <div className="news-card">
      <img className="news-card__img" src={data.image} alt="" />
      <h3 className="news-card__title">{data.title}</h3>
      <p className="news-card__text">{data.information}</p>
      <p className="news-card__date">{data.date}</p>
    </div>
  );
};

export default NewsCard;
