import React from "react";
import "./index.css";

const CssVariablesPage = () => {
  return (
    <div class="controls">
      <label for="spacing">Spacing:</label>
      <input
        id="spacing"
        type="range"
        name="spacing"
        min="10"
        max="200"
        value="10"
        data-sizing="px"
      />

      <label for="blur">Blur:</label>
      <input
        id="blur"
        type="range"
        name="blur"
        min="0"
        max="25"
        value="10"
        data-sizing="px"
      />

      <label for="base">Base Color</label>
      <input id="base" type="color" name="base" value="#ffc600" />
    </div>
  );
};

export default CssVariablesPage;
