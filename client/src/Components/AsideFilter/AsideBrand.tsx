import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface BrandInputProps {
  label: string[];
  setLabel: React.Dispatch<React.SetStateAction<string[]>>;
}

const AsideBrand = ({ label, setLabel }: BrandInputProps) => {
  const handleChange = (newBrand: string) => {
    const isChecked = label.includes(newBrand);

    if (isChecked) {
      setLabel(label.filter((item) => item !== newBrand));
    } else {
      setLabel([...label, newBrand]);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id="category"
        sx={{ fontSize: "18px", fontWeight: "550" }}
      >
        Бренд
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox sx={{ color: "rgb(223, 224, 226)" }} />}
            label="Makita"
            checked={label.includes("Makita")}
            onChange={() => handleChange("Makita")}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "rgb(223, 224, 226)" }} />}
            label="Bosch"
            checked={label.includes("Bosch")}
            onChange={() => handleChange("Bosch")}
          />{" "}
          <FormControlLabel
            control={<Checkbox sx={{ color: "rgb(223, 224, 226)" }} />}
            label="DEWALT"
            checked={label.includes("DEWALT")}
            onChange={() => handleChange("DEWALT")}
          />{" "}
          <FormControlLabel
            control={<Checkbox sx={{ color: "rgb(223, 224, 226)" }} />}
            label="Dexp"
            checked={label.includes("Dexp")}
            onChange={() => handleChange("Dexp")}
          />{" "}
          <FormControlLabel
            control={<Checkbox sx={{ color: "rgb(223, 224, 226)" }} />}
            label="HUNTER"
            checked={label.includes("HUNTER")}
            onChange={() => handleChange("HUNTER")}
          />{" "}
          <FormControlLabel
            control={<Checkbox sx={{ color: "rgb(223, 224, 226)" }} />}
            label="PECAHTA"
            checked={label.includes("PECAHTA")}
            onChange={() => handleChange("PECAHTA")}
          />
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default AsideBrand;
