import { Slider, Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
const Range = styled(Slider)({
  color: " rgb(24, 111, 212)",
  height: 2,

  "& .MuiSlider-thumb": {
    height: 19,
    width: 19,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
  },
});

export interface RangeInputProps {
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
}

const RangeInput = ({ price, setPrice }: RangeInputProps) => {
  const [maxValue, setMaxValue] = useState(price[1]);
  const [minValue, setMinValue] = useState(price[0]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  useEffect(() => {
    setMaxValue(price[1]);
    setMinValue(price[0]);
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Range
          getAriaLabel={() => "Temperature range"}
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={100}
          min={minValue}
          max={maxValue}
        />
      </Box>
    </div>
  );
};

export default RangeInput;
