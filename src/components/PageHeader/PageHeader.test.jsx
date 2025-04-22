import { render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import PageHeader from "./index";

describe("PageHeader", () => {
  test("renders with header correctly", () => {
    render(TestHelper(<PageHeader header="Heading" />));
    expect(screen.getByText(/Heading/i)).toBeInTheDocument();
  });
  test("renders component even if no props passed", () => {
    render(TestHelper(<PageHeader />));
  });
});
