import axios from "axios";
import React, { useState } from "react";

import { Layout } from "../../components/layout";

const SummerFunctionWeek2 = () => {
  const [state, setState] = useState({ status: "initial", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ status: "pending", message: "..." });
    try {
      await axios.post(event.target.action);
      setState({ status: "fulfilled", message: "YEAH" });
    } catch (error) {
      setState({ status: "failed", message: error.message });
    }
  };

  return (
    <Layout>
      <form action="/api/gsf-week2-vote" method="POST" onSubmit={handleSubmit}>
        <button>Vote 8000</button>
      </form>
      <p>{state.message}</p>
    </Layout>
  );
};

export default SummerFunctionWeek2;
