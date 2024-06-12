interface Item {
  name: string;
  image: string;
}

const AssortimentCard = (item: Item, idx: number) => {
  return (
    <li className="home-catalog-assortment-item" key={idx}>
      <img
    
        src={item.image}
        alt="image"
      />
      <p>{item.name}</p>
    </li>
  );
};

export default AssortimentCard;
