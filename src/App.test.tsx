import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders hello", () => {
  render(<App />);
  const element = screen.getByText(/./i);
  expect(element).toBeInTheDocument();
});
