interface Item {
  image: string;
  title: string;
  discount: string;
}

const AdvertisingCard = (item: Item, idx: number) => {
  return (
    <div
      className="adversting-card"
      style={{ backgroundImage: `url(${item.image})` }}
      key={idx}
    >
      <p>{item.title}</p>
      <span className="adversting-card__discount">{item.discount}</span>
    </div>
  );
};

export default AdvertisingCard;
