import React from "react";
import { Box } from "@mui/material";
import ImageComponent from "../../../components/ImageComponent";
import changiAirport from "../../../assets/Logos/changiAirport.svg";

const Footer = () => {
  const date = new Date();
  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "grey.400",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: { xs: "center", sm: "flex-start" },
        p: 2,
      }}
    >
      <Box
        sx={{
          height: 55,
          width: 95,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ImageComponent src={changiAirport} alt="ChangiLogo" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "0.7rem",
          alignItems: { xs: "center", sm: "flex-end" },
          fontWeight: 700,
          pt: 2,
        }}
      >
        <Box>
          {/* <span style={{ color: "inherit", marginRight: "1rem" }}>
            Privacy Policy
          </span>
          {"|"} */}
          <span style={{ color: "inherit", marginLeft: "1rem" }}>
            <a href={"https://selleruniversity.ishopchangi.com/wordpress/"} target="_blank">Seller University</a>
          </span>
          <span style={{ color: "inherit", marginLeft: "1rem" }}>
            |
          </span>
          <span style={{ color: "inherit", marginLeft: "1rem" }}>
            <a href={"https://support.ishopchangi.com/servicedesk/customer/portal/9"} target="_blank">Merchant Service Desk</a>
          </span>
          <span style={{ color: "inherit", marginLeft: "1rem" }}>
            |
          </span>
          <span style={{ color: "inherit", marginLeft: "1rem" }}>
            <a href={"/terms-and-conditions"} target="_blank">Terms & Conditions</a>
          </span>
        </Box>
        <Box>{`© ${date.getFullYear()} Changi Airport Group. All Rights Reserved.`}</Box>
      </Box>
    </Box>
  );
};

export default Footer;
