import React from "react";
import renderer from "react-test-renderer";
import HomePage from "../components/Home/Home";

/* Creating a snapshot test to check that the Home page renders correctly */
it("I am running a snapshot test in order to ensure that the Home page component renders correctly.", () => {
  const output = renderer.create(<HomePage />).toJSON();
  expect(output).toMatchSnapshot();
});
