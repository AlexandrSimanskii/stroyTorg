import { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";

import { ProductType } from "../../types/types";

type TabsType = {
  product: ProductType;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductTabs = ({ product }: TabsType) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  return (
    <Box id="tabs" sx={{ width: "100%", marginBottom: "40px" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "30px" }}
      >
        <Tabs
          sx={{
            "& .MuiTabs-indicator": {
              transform: "translateY(1px)",
              zIndex: "4",
              backgroundColor: "rgb(238, 9, 6)",
            },
            "& .Mui-selected": {
              color: "black !important",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              color: "rgb(143, 146, 150)",
              fontWeight: "550",
              fontSize: "19px",
            }}
            label="Характеристики"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              color: "rgb(143, 146, 150)",
              fontWeight: "550",
              fontSize: "19px",
            }}
            label="О товаре"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              color: "rgb(143, 146, 150)",
              fontWeight: "550",
              fontSize: "19px",
            }}
            label="Доставка и оплата"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <Typography sx={{ fontSize: "20px", fontWeight: 550 }}>
        Характеристики товара {`"${product.name}"`}
      </Typography>
      <CustomTabPanel value={value} index={0}>
        <div className="tab-params">
          {Object.entries(product.characteristics).map(([key, value]) => (
            <div key={key} className="product-params__group">
              <dt>{key}</dt>
              <div className="product-params__doted"></div>
              <dd className="product-params__dd">{value}</dd>
            </div>
          ))}
        </div>
        <span>
          Производитель оставляет за собой право без уведомления продавца менять
          характеристики, внешний вид, комплектацию товара и место его
          производства. Указанная информация не является публичной офертой.
        </span>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <p>{product.description}</p>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <p>
          C условиями доставки и оплаты можете ознакомиться в личном кабинете
        </p>
      </CustomTabPanel>
    </Box>
  );
};

export default ProductTabs;
