import { render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import NavSection from "./NavSection";
import userEvent from "@testing-library/user-event";

const data = [
  {
    title: "Merchant Management",
    icon: () => <img src="path" alt="Merchant Management Icon" />,
    nestedItems: [
      {
        title: "All Merchants",
        to: "/merchant-management/all-merchants",
      },
      {
        title: "Pending Approval",
        to: "/merchant-management/pending-approval",
      },
    ],
  },
];

describe("NavSection", () => {
  test("should render the tab with title and icon", () => {
    render(TestHelper(<NavSection data={data} />));
    expect(
      screen.getByAltText(/Merchant Management Icon/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Merchant Management/i)).toBeInTheDocument();
  });

  test("shouldn't throw any error if data is null", () => {
    render(TestHelper(<NavSection />));
  });

  test("should render the sub tabs when clicking tab", async () => {
    render(TestHelper(<NavSection data={data} />));
    await userEvent.click(
      screen.getByRole("button", { name: /Merchant Management/i }),
    );
    expect(screen.getByText(/All Merchants/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Approval/i)).toBeInTheDocument();
  });
});
