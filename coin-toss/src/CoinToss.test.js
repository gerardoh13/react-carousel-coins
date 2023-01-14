import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CoinToss from "./CoinToss";

beforeEach(function() {
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.75);
});

it("renders without crashing", function() {
  render(<CoinToss testing/>);
});

it("matches snapshot", function() {
  const { asFragment } = render(<CoinToss testing/>);
  expect(asFragment()).toMatchSnapshot();
});

it("doesn't show a coin on page load", function() {
  const { queryByTestId } = render(<CoinToss testing/>);

  expect(queryByTestId("coin")).toHaveClass("hidden");
});

it("counts correctly when heads appears", function() {
  const { getByText, queryByAltText } = render(<CoinToss testing/>);

  const button = getByText("FLIP MEEEE");
  fireEvent.click(button);

  expect(queryByAltText("heads")).toBeInTheDocument();
  expect(queryByAltText("tails")).not.toBeInTheDocument();
  expect(
    getByText("Out of 1 flips, there have been 1 heads and 0 tails.")
  ).toBeInTheDocument();
});

it("counts correctly when tails appears", function() {
  const { getByText, queryByAltText } = render(<CoinToss testing/>);

  const button = getByText("FLIP MEEEE");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(queryByAltText("tails")).toBeInTheDocument();
  expect(queryByAltText("heads")).not.toBeInTheDocument();
  expect(
    getByText("Out of 2 flips, there have been 1 heads and 1 tails.")
  ).toBeInTheDocument();
});

afterEach(function() {
  Math.random.mockRestore();
});
