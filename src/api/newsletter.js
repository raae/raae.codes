const axios = require("axios");

const addConvertKitSubscriber = async ({ email, formId, apiKey }) => {
  const endpoint = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  const { data } = await axios.post(endpoint, {
    api_key: apiKey,
    email: email,
  });

  console.log("ConvertKit subscriber added", data.subscription.subscriber.id);
  return data.subscription.subscriber;
};

// const addUserlistSubscriber = async ({ email, pushKey }) => {
//   const endpoint = `https://push.userlist.com/users`;
//   const { data } = await axios.post(
//     endpoint,
//     { email: email },
//     {
//       headers: {
//         Authorization: `Push ${pushKey}`,
//       },
//     }
//   );

//   console.log("Userlist subscriber added", data);
//   // return data.subscription.subscriber;
// };

const subscribe = async ({ email, subscriptions }) => {
  const promises = subscriptions.map((subscription) => {
    switch (subscription) {
      case "lilly":
        return addConvertKitSubscriber({
          email: email,
          formId: process.env.CK_FORM_ID_LILLY_LABS,
          apiKey: process.env.CK_API_KEY_LILLY_LABS,
        });
      case "gatsby":
        return addConvertKitSubscriber({
          email: email,
          formId: process.env.CK_FORM_ID_GATSBY,
          apiKey: process.env.CK_API_KEY_GATSBY,
        });
      case "pow":
        return addConvertKitSubscriber({
          email: email,
          formId: process.env.CK_FORM_ID_POW,
          apiKey: process.env.CK_API_KEY_POW,
        });

      default:
        return Promise.reject(`Invalid subscription key: ${subscription}`);
    }
  });

  const results = await Promise.allSettled(promises);

  return results.map((result, index) => {
    return {
      subscription: subscriptions[index],
      status: result.status,
      message: result.reason?.message,
      id: result.value?.id,
    };
  });
};

export default async (req, res) => {
  try {
    const result = await subscribe(req.body);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error({ message: error.response?.message || error.message });
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
