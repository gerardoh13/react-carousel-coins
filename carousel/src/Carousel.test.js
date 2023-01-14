import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  // expect the first image to show
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  // move forward in the carousel, expect second image to show
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move back in the carousel, expect first image to show again
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
});

it("hides the left button if first image displayed", () => {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
// left arrow should be hidden, right arrow should be shown
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");
    // move forward in the carousel
  fireEvent.click(rightArrow);
  // both arrows should be shown for second picture
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");
})

it("hides the right button if last image displayed", () => {
  const { queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
      // move forward in the carousel to the last picture
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(rightArrow).toHaveClass("hidden");

})