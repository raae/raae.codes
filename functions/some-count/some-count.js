const cheerio = require("cheerio");
const axios = require("axios");
const addWeeks = require("date-fns/add_weeks");
const format = require("date-fns/format");
const { reduce } = require("lodash");
const { fetchContent, saveContent } = require("./octokit");

const PROFILES = {
  twitter: ["raae"],
  instagram: ["benedicteraae", "raae.codes"]
};

const fileName = (weeksToAdd = 0) => {
  const date = addWeeks(new Date(), weeksToAdd);
  return format(date, "YYYY-MM-DD") + ".json";
};

const fetchTwitterData = async accountName => {
  const data = {};
  try {
    const page = await axios.get(`https://twitter.com/${accountName}`);
    const $ = cheerio.load(page.data);
    const element$ = $(".ProfileNav-item--followers .ProfileNav-value");
    data.count = parseInt(element$.attr("data-count"), 10);
  } catch (error) {
    data.error = error.message;
  }

  return data;
};

const fetchInstagramData = async accountName => {
  const data = {};
  try {
    const page = await axios.get(
      `https://www.instagram.com/${accountName}/?__a=1`
    );
    const json = page.data;
    data.count = json.graphql.user.edge_followed_by.count;
  } catch (error) {
    data.error = error.message;
  }

  return data;
};

const fetchProviderData = async ({ account, provider }) => {
  switch (provider) {
    case "twitter":
      return await fetchTwitterData(account);

    case "instagram":
      return await fetchInstagramData(account);
  }
};

const fetchThisWeeksData = async (profiles = PROFILES) => {
  const fetchData = async ({ provider, account }) => {
    const data = await fetchProviderData({ provider, account });
    data.provider = provider;
    data.account = account;
    return data;
  };

  const flattenProfiles = profiles =>
    reduce(
      profiles,
      (result, accounts, provider) => {
        result.push(...accounts.map(account => ({ account, provider })));
        return result;
      },
      []
    );

  const deflattenData = data =>
    reduce(
      data,
      (result, { provider, account, count }) => {
        result[provider] = {
          ...result[provider],
          [account]: {
            count
          }
        };
        return result;
      },
      {}
    );

  const promises = flattenProfiles(profiles).map(profile => fetchData(profile));
  const data = await Promise.all(promises);
  return deflattenData(data);
};

const fetchLastWeeksData = async () => {
  return fetchContent({ path: fileName(-1) });
};

const saveThisWeeksContent = async content => {
  return saveContent({
    path: fileName(),
    message: `This weeks stats ${fileName()}.`,
    content: content
  });
};

const generateThisWeeksProviderContent = (lastWeeksData, thisWeeksData) => {
  return reduce(
    thisWeeksData,
    (result, accountData, accountName) => {
      result[accountName] = {
        count: accountData.count,
        change: accountData.count - lastWeeksData[accountName].count
      };
      return result;
    },
    {}
  );
};

const generateThisWeeksContent = (lastWeeksData, thisWeeksData) => {
  if (lastWeeksData.error) return thisWeeksData;

  console.log(lastWeeksData);

  return reduce(
    thisWeeksData,
    (result, thisWeeksProviderData, providerName) => {
      result[providerName] = generateThisWeeksProviderContent(
        lastWeeksData[providerName],
        thisWeeksProviderData
      );
      return result;
    },
    {}
  );
};

exports.handler = async () => {
  const lastWeeksData = await fetchLastWeeksData();
  const thisWeeksData = await fetchThisWeeksData();
  const content = generateThisWeeksContent(lastWeeksData, thisWeeksData);

  try {
    await saveThisWeeksContent(content);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          content
        },
        null,
        2
      )
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error
        },
        null,
        2
      )
    };
  }
};
