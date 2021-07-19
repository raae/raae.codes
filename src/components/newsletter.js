import React, { useState } from "react";
import { Box, Grid, Button, Label, Input, Checkbox, Paragraph } from "theme-ui";

export const Newsletter = () => {
  const [subscriptions, setSubscriptions] = useState({
    gatsby: false,
    pow: false,
    lilly: false,
  });

  const [subscriber, setSubscriber] = useState({ name: "", email: "" });

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
    console.log("submit", { subscriber, subscriptions });
  };

  const atLeastOneSubscription = Object.keys(subscriptions).some(
    (key) => subscriptions[key]
  );

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
          advanced Gatsby developer tips from Queen Raae (weekly)
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
        ></Input>
      </Box>

      <Button sx={{ maxWidth: "20em" }} disabled={!atLeastOneSubscription}>
        Subscribe
      </Button>
    </Grid>
  );
};
