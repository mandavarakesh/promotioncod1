import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useAppSelector } from "../../redux/redux-hooks";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // zIndex: 1000,
  // position: "sticky",
  // top: 64,
  width: "100%",
  marginBottom: "1rem",
  padding: "0.2rem 1rem",
  "& .divider": {
    margin: "0 1rem",
    backgroundColor: theme.palette.grey[400],
    flexGrow: 1,
    maxWidth: "3rem",
    height: 1.5,
  },
}));

const MainBox = styled(Box)(() => ({
 
  zIndex: 1000,
  position: "sticky",
  top: 63,
  width: "100%",
  paddingTop:"10px",
  backgroundColor:"#F4F6F8"
}));

const SECTION = {
  GENERIC: 0,
  VARIANT: 1,
  CATEGORY: 2,
};

const sections = [
  { id: SECTION.GENERIC, name: "Generic Attributes" },
  { id: SECTION.VARIANT, name: "Unique Attributes" },
  { id: SECTION.CATEGORY, name: "Category Attributes" },
];

const FormPositionIndicator = ({ disabled, handleSectionChange }) => {
  const { showSection } = useAppSelector((state) => state.product);
  const lastSection = sections.length - 1;
  return (
    <MainBox>
    <StyledBox
      sx={{ pointerEvents: disabled ? "none" : "all" }}
      component={Paper}
    >
      {sections.map((section, index) => {
        const selectedPoint = showSection === section.id;
        return (
          <React.Fragment key={section.id}>
            <Box>
              <FormControlLabel
                sx={{ marginRight: 0 }}
                control={
                  <Checkbox
                    checked={selectedPoint}
                    inputProps={{
                      "data-testid":"checkbox"
                    }}
                    onClick={() => handleSectionChange(section.id)}
                    icon={<RadioButtonUncheckedIcon color="disabled" />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                }
                label={
                  <Typography
                    fontWeight={selectedPoint ? "bold" : ""}
                    fontSize="0.8rem"
                  >
                    {section.name}
                  </Typography>
                }
              />
            </Box>
            {index !== lastSection && <Box className="divider" />}
          </React.Fragment>
        );
      })}
    </StyledBox>
    </MainBox>
  );
};

export default FormPositionIndicator;
