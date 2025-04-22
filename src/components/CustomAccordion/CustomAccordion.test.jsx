import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomAccordion from "./index";

describe("CustomAccordion", () => {
  const mockAccordionMainView = "Accordion Main View";
  const mockAccordionDescription = "Accordion Description";

  test("renders CustomAccordion component with provided props", () => {
    const { getByText } = render(
      <CustomAccordion
        AccordionMainView={mockAccordionMainView}
        AccordionDescription={mockAccordionDescription}
      />
    );
    expect(getByText(mockAccordionMainView)).toBeInTheDocument();
    expect(getByText(mockAccordionDescription)).toBeInTheDocument();
  });

  test("expands and collapses accordion on click", () => {
    const { getByTestId } = render(
      <CustomAccordion
        AccordionMainView={mockAccordionMainView}
        AccordionDescription={mockAccordionDescription}
      />
    );
    const accordionSummary = getByTestId("accordion-summary");
    const accordionDetails = getByTestId("accordion-details");
    expect(accordionDetails).not.toBeVisible();
    fireEvent.click(accordionSummary);
    expect(accordionDetails).toBeVisible();
    fireEvent.click(accordionSummary);
    expect(accordionDetails);
  });
});
