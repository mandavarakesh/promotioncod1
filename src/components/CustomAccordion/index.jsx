import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, Paper } from "@mui/material";

export default function CustomAccordion({
  AccordionMainView,
  AccordionDescription,
}) {
  return (
    <div>
      <Accordion component={Paper} elevation={5}>
        <AccordionSummary
          expandIcon={
            <IconButton>
              <ExpandMoreIcon />
            </IconButton>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          data-testid="accordion-summary"
        >
          {AccordionMainView}
        </AccordionSummary>
        <AccordionDetails data-testid="accordion-details">
          {AccordionDescription}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
