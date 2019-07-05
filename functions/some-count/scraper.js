const cheerio = require("cheerio");
const axios = require("axios");

const fetchTwitterData = async accountName => {
  const page = await axios.get(`https://twitter.com/${accountName}`);
  const $ = cheerio.load(page.data);
  const element$ = $(".ProfileNav-item--followers .ProfileNav-value");
  return parseInt(element$.attr("data-count"), 10);
};

const fetchInstagramData = async accountName => {
  const page = await axios.get(
    `https://www.instagram.com/${accountName}/?__a=1`
  );
  const json = page.data;
  return parseInt(json.graphql.user.edge_followed_by.count, 10);
};

exports.fetchProviderData = async ({ account, provider }) => {
  let data = {};

  try {
    switch (provider) {
      case "twitter":
        data.count = await fetchTwitterData(account);
        break;

      case "instagram":
        data.count = await fetchInstagramData(account);
        break;
    }
  } catch (error) {
    data.error = error;
  }

  data.account = account;
  data.provider = provider;

  return data;
};
