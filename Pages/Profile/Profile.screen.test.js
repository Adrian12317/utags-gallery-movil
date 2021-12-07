import React from "react";
import renderer from "react-test-renderer";
import Profile from "./Profile.screen";

describe("<Profile />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});