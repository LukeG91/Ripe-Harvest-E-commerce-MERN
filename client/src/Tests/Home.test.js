/* Importing the libraries and file that I need */
import React from "react";
import renderer from "react-test-renderer";
import HomePage from "../components/Home/Home";

/* Creating a snapshot test to check that the Home page renders correctly */
it("I am running a snapshot test in order to ensure that the Home page component renders correctly.", () => {
  const tree = renderer.create(<HomePage />).toJSON();
  expect(tree).toMatchSnapshot();
});

/* Resource used:
   ===============
   YouTube video:
   Title of video: Learn React Snapshot Testing with Example
   Date published: March 17, 2020
   Published by: RakibTG
   Link to video: https://www.youtube.com/watch?v=wfFw05TaBfM&t=475s
   =================================================================
*/
