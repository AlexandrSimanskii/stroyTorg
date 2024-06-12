export const getCorrectProd = (number: number) => {
  const lastNum = number.toString().at(-1);
  if (lastNum === "1" && number !== 11) {
    return "продукт";
  } else if (
    (number > 4 && number < 21) ||
    (Number(lastNum) > 4 && Number(lastNum) < 10) ||
    lastNum === "0"
  ) {
    return "продуктов";
  } else {
    return "продукта";
  }
};
