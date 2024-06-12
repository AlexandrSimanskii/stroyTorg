export type CharacteristicsType = {
  "Тип товара"?: string;

  "Мощность (Вт)"?: string;

  "Емкость АКБ (А/ч)"?: string;

  "Крутящий момент макс. (Н/м)"?: string;

  "Напряжение аккумулятора (В)"?: string;

  Цвет?: string;

  "Диаметр патрона мин. (мм)"?: string;

  "Диаметр патрона макс. (мм)"?: string;

  "Скорость вращения I (об/мин)"?: string;

  "Скорость вращения II (об/мин)"?: string;

  "Диаметр сверления дерева макс. (мм)"?: string;

  "Диаметр сверления металла макс. (мм)"?: string;

  "Тип двигателя"?: string;

  "Вес (кг)"?: string;

  "Тип патрона"?: string;

  "Тип аккумулятора"?: string;
};

export type ProductOrderType = {
  order: {
    _id: string;
    count: number;
  }[];
  date: string;
  "total price": string;
  id: string;
};

export type UserCartType = {
  _id: string;
  count: number;
};
export type ProductType = {
  name: string;
  type: string;
  label: string;
  category: string;
  regularPrice: number;
  discountPrice: number;
  sale: number;
  article: string;
  _id: string;
  count: number;
  images: string[];
  characteristics: CharacteristicsType;
  description: string;
};

export type UserType = {
  _id: string;
  email: string;
  phone: string;
  username: string;
  region: string;
  cart: UserCartType[];
  order: ProductOrderType[];
  favorite: string[];
};

export type NewsType = {
  _id: string;
  image: string;
  title: string;
  information: string;
  category: string;
  date: string;
};

export type SortFilterPropsType = {
  startIndex: number;
  category: string;
  label: string[];
  price: number[];
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setCountPages: React.Dispatch<React.SetStateAction<number>>;
};

export type AsideFilterPropsType = {
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  label: string[];
  setLabel: React.Dispatch<React.SetStateAction<string[]>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  limit: number;
  sort: string;
  setCountPages: React.Dispatch<React.SetStateAction<number>>;
};
export type ReviewType = {
  _id: string;
  createdAt: string;
  name: string;
  email: string;
  text: string;
  imageUrls?: string[] | [];
};
export type InputsType = {
  imageUrls: string[] | [];
  name: string;
  email: string;
  text: string;
  phone?: string;
};
export type CartProductType = {
  _id: string;
  name: string;
  regularPrice: string;
  article: string;
  img: string;
  discountPrice?: string;
  count: number;
};
