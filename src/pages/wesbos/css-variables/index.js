import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import * as style from "./index.module.css";

import { Layout } from "../../../components/layout";

const SIZING = {
  spacing: "px",
  blur: "px",
  color: "",
};

const CssVariablesPage = ({ location }) => {
  const [values, setValues] = useState({
    spacing: 0,
    blur: 0,
    color: "",
  });
  const [rootNode, setRootNode] = useState();

  const rootRef = useCallback((node) => {
    if (!node) return;

    setRootNode(node);
    setValues((currentValues) => {
      return Object.keys(currentValues).reduce((acc, key) => {
        acc[key] = getComputedStyle(node)
          .getPropertyValue(`--${key}`)
          .replace(" ", "")
          .replace(SIZING[key], "");
        return acc;
      }, {});
    });
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value,
      };
    });

    rootNode.style.setProperty(`--${name}`, `${value}${SIZING[name]}`);
  };

  return (
    <Layout>
      <section className={style.root} ref={rootRef}>
        <h1>CSS Variables</h1>
        <p>
          The WesBos Vanilla{" "}
          <a href="https://javascript30.com/">Javascript30</a> Day 3 Challenge,
          but done in React on Gatsby.
        </p>
        <p>
          If you wanna see how I solved it check out{" "}
          <a href="https://github.com/raae/raae.codes/pull/11">
            the Pull Request
          </a>
          , feel free to leave a comment if you have a question or any type of
          feedback.
        </p>
        <h2>
          Update CSS Variables with <span className={style.hl}>JS</span>
        </h2>
        <div className={style.controls}>
          <label htmlFor="spacing">Spacing:</label>
          <input
            id="spacing"
            type="range"
            name="spacing"
            min="10"
            max="200"
            value={values.spacing}
            data-sizing="px"
            onChange={handleChange("spacing")}
          />

          <label htmlFor="blur">Blur:</label>
          <input
            id="blur"
            type="range"
            name="blur"
            min="0"
            max="25"
            value={values.blur}
            data-sizing="px"
            onChange={handleChange("blur")}
          />

          <label htmlFor="base">Base Color</label>
          <input
            id="base"
            type="color"
            name="base"
            value={values.color}
            onChange={handleChange("color")}
          />
        </div>
        <img
          alt="Random nature shot"
          src="https://source.unsplash.com/7bwQXzbF6KE/800x500"
        ></img>
      </section>
    </Layout>
  );
};

export default CssVariablesPage;
