import { useState } from "react";

import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Accordion,
} from "@mui/material";

import { IoRemoveSharp } from "react-icons/io5";

import { IoAddSharp } from "react-icons/io5";
type Data = {
  data: string[];
};

const Accardion = ({ data }: Data) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <>
      <Accordion
        sx={{ padding: "16px 0" }}
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
      >
        <AccordionSummary
          expandIcon={
            isAccordionOpen ? (
              <IoRemoveSharp className="accardion-btn" />
            ) : (
              <IoAddSharp className="accardion-btn" />
            )
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "550", marginRight: "20px" }}
          >
            {data[0]}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: "64676A" }}>{data[1]}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Accardion;