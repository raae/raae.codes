import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Label,
  Input,
  Checkbox,
  Paragraph,
  Text,
} from "theme-ui";

const DEFAULT_SUBSCRIBER = { name: "", email: "" };
const DEFAULT_SUBSCRIPTIONS = {
  gatsby: false,
  pow: false,
  lilly: false,
};

export const Newsletter = () => {
  const [subscriptions, setSubscriptions] = useState(DEFAULT_SUBSCRIPTIONS);
  const [subscriber, setSubscriber] = useState(DEFAULT_SUBSCRIBER);

  const [status, setStatus] = useState("INITIAL");

  const handleOnSubscriptionsChange = (name) => (event) => {
    setSubscriptions((current) => {
      return {
        ...current,
        [name]: event.target.checked,
      };
    });
  };

  const handleOnSubscriberChange = (name) => (event) => {
    setSubscriber((current) => {
      return {
        ...current,
        [name]: event.target.value,
      };
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setStatus("PENDING");

    try {
      await axios.post("/api/newsletter", {
        subscriber,
        subscriptions: Object.keys(subscriptions).filter(
          (key) => subscriptions[key]
        ),
      });
      setSubscriber(DEFAULT_SUBSCRIBER);
      setSubscriptions(DEFAULT_SUBSCRIPTIONS);
      setStatus("FULFILLED");
    } catch (error) {
      console.warn(error);
      setStatus("FAILED");
    }
  };

  const atLeastOneSubscription = Object.keys(subscriptions).some(
    (key) => subscriptions[key]
  );

  const disabled = !atLeastOneSubscription || status === "PENDING";

  return (
    <Grid as="form" onSubmit={handleOnSubmit} gap="1.5em">
      <Paragraph>
        Keep updated on <em>all the things</em> by signing up for{" "}
      </Paragraph>
      <Grid gap="0.5em">
        <Label>
          <Checkbox
            checked={subscriptions.gatsby}
            onChange={handleOnSubscriptionsChange("gatsby")}
          />
          emails from Queen Raae related to Gatsby (often)
        </Label>
        <Label>
          <Checkbox
            checked={subscriptions.pow}
            onChange={handleOnSubscriptionsChange("pow")}
          />
          the POW! Newsletter (every two weeks)
        </Label>

        <Label>
          <Checkbox
            checked={subscriptions.lilly}
            onChange={handleOnSubscriptionsChange("lilly")}
          />
          updates from our family/business (monthly)
        </Label>
      </Grid>

      <Box sx={{ maxWidth: "20em" }}>
        <Label htmlFor="name">Name:</Label>
        <Input
          id="name"
          name="name"
          value={subscriber.name}
          onChange={handleOnSubscriberChange("name")}
          disabled={disabled}
        ></Input>
      </Box>
      <Box sx={{ maxWidth: "20em" }}>
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={subscriber.email}
          required={true}
          onChange={handleOnSubscriberChange("email")}
          disabled={disabled}
        ></Input>
      </Box>

      <Button sx={{ maxWidth: "20em" }} disabled={disabled}>
        Subscribe
      </Button>
      <Text>
        {status === "PENDING" && <>Hold on...</>}
        {status === "FULFILLED" && <>Check your inbox to confirm...</>}
        {status === "FAILED" && <>Oh no...something went wrong</>}
      </Text>
    </Grid>
  );
};
