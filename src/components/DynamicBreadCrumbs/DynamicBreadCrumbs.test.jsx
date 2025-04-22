import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import DynamicBreadCrumbs from "./index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockImplementation(() => ({ id: 1 })),
}));

jest.mock("../../redux/redux-hooks", () => ({
  ...jest.requireActual("../../redux/redux-hooks"),
  useAppSelector: jest
    .fn()
    .mockImplementation(() => ({
      user: {
        
       
        
        
        
        roleType: 1,
        
        defaultShop: 45
      },
      breadcrumbModifiers: {
        id: "id",
        searchParams:"searchParams"
      },
    })),
}));
jest.mock("../../utils/persistentData", () => ({
  __esModule: true,
  ...jest.requireActual(),
  getDataFromLocalStorage: jest.fn().mockReturnValue({ user: { roleType: 1, defaultShop: 45 } })
}));

const middlewares = [];
const mockStore = configureStore(middlewares);
const store = mockStore({});

const TestComponent = () => {
  const navigate = useNavigate();

  return (
    <>
      <DynamicBreadCrumbs />
      <div>test</div>
      <button onClick={() => navigate("/all-orders/1")}>id route</button>
    </>
  );
};

describe("DynamicBreadCrumbs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders DynamicBreadCrumbs with initial state", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TestComponent />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("renders DynamicBreadCrumbs with custom route", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TestComponent />} />
            <Route path="/all-orders/:id" element={<TestComponent />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: /id route/i }));
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("All Orders")).toBeInTheDocument();
  });


  
});
