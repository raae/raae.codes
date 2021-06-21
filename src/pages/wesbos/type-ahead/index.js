import React from "react";
import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import * as style from "./index.module.css";

const ENDPOINT =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const findMatches = (cities, wordToMatch) => {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
};

const TypeAheadPage = () => {
  const [cities, setCities] = useState([]);
  const [wordToMatch, setWordToMatch] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT);
      const data = await response.json();
      setCities(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setMatches(findMatches(cities, wordToMatch));
  }, [cities, wordToMatch]);

  const handleInputChange = (event) => {
    setWordToMatch(event.target.value);
  };

  return (
    <Layout>
      <section className={style.root}>
        <h1>Gatsbyfied Type Ahead</h1>
        <p>
          The WesBos Vanilla{" "}
          <a href="https://javascript30.com/">Javascript30</a> Day 6 Challenge,
          but done in React on Gatsby.
        </p>
        <p>
          If you wanna see how I solved it check out{" "}
          <a href="https://github.com/raae/raae.codes/pull/13">
            the Pull Request
          </a>
          , feel free to leave a comment if you have a question or any type of
          feedback.
        </p>

        <form>
          <input
            type="text"
            placeholder="City or State"
            onChange={handleInputChange}
            onKeyUp={handleInputChange}
            value={wordToMatch}
          />
          <ul>
            {!wordToMatch ? (
              <>
                <li>Filter for a city</li>
                <li>or a state</li>
              </>
            ) : (
              <>
                {matches.map((place) => {
                  const regex = new RegExp(`(${wordToMatch})`, "ig");
                  const cityName = place.city.replace(regex, `<em>$1</em>`);
                  const placeName = place.state.replace(regex, `<em>$1</em>`);
                  return (
                    <li
                      key={`${place.city}-${place.state}`}
                      dangerouslySetInnerHTML={{
                        __html: `<span>${cityName}, ${placeName}</span><span>${place.population}</span>`,
                      }}
                    ></li>
                  );
                })}
              </>
            )}
          </ul>
        </form>
      </section>
    </Layout>
  );
};

export default TypeAheadPage;
