import React from "react";
import renderer from "react-test-renderer";
import Posts from "./Posts.screen";

describe("<Posts />", () => {
  it("has styled center", () => {
    const tree = renderer.create(<Posts />).toJSON();
    
    expect(tree.props.style[0].alignItems).toEqual("center");
  });
});