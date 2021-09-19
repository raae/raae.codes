# ConvertKit API —&nbsp;programmatically adding and updating subscribers

On yesterday's [Sunday Funday POW! Stream](https://youtu.be/-SE-FSJQQ9g) I started exploring the ConvertKit API.

**Why?** I would like to use ConvertKIt for all my POW! emailing needs: newsletter, occatinal broadcast and some automated sequences such as a series of welcome emails.

I chose ConvertKit mostly because of familiarity, but also because it allows me to disable tracking opens. Something I feel is the right thing to do with a focused privacy product like POW! — the privacy-first menstrual cycle journal.

https://youtu.be/-SE-FSJQQ9g

## Adding subscribers programmatically

ConvertKit does not allow you to add subscribers without adding them to either a Form, Sequence, or Tag. This also holds true for the ConvertKit API. Therefore you will not find an add subscriber endpoint when looking under subscribers in the [API docs](https://developers.convertkit.com/).

For POW! I have chosen to create a dummy API form I will add users to. I can then use it as a starting point for an automation assigning the correct tags. I could have added them straight to a tag or tags, but if I decided to change up my tag strategy, it would be nice to not have to dive back into the code.

If you decide to do the same, make sure to disable double opt-in for the form, so they do not get sent the typical "confirm your subscription" email.

```js
const addSubscriber = async ({ email, apiKey, formId }) => {
  const endpoint = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  const { data } = await axios.post(endpoint, {
    api_key: apiKey,
    email: email,
  });

  console.log("Subscriber added", data.subscription.subscriber.id);
  return data.subscription.subscriber;
};
```

Additional notes:

- The subscription.id is not the same as the subscription.subscriber.id.
- If the email has already been added, the API returns the exciting subscriber.

## Update subscribers

Users may change their email address in the app. If I were to remove the existing subscriber and add a new one for the new email address, all automations would start over...not what we want.

Luckily the ConvertKit API has an endpoint to update existing subscribers.

```js
const updateSubscriber = async ({ id, email, apiSecret }) => {
  const endpoint = `https://api.convertkit.com/v3/subscribers/${id}`;
  const data = {
    api_secret: apiSecret,
    email_address: email,
  };
  const response = await axios.put(endpoint, data);
  const subscriber = response.data.subscriber;

  console.log("Subscriber updated", subscriber.id);
  return subscriber;
};
```

Additional notes:

- The update endpoint is `put` not `post` as a viewer of the stream pointed out to me.
- It's `email_address`, not `email` as when adding a subscriber.
- If the email is already in use, you get a 400 status code.

---

That's it for now. I will update these notes whenever I learn something new while working on my ConvertKit - POW! integration.
