const cheerio = require("cheerio");
const axios = require("axios");
const addWeeks = require("date-fns/add_weeks");
const format = require("date-fns/format");
const { reduce } = require("lodash");
const Octokit = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const PROFILES = {
  twitter: ["raae"],
  instagram: ["benedicteraae", "raae.codes"]
};

const OCTOKIT_PARAMS = {
  owner: "raae",
  repo: "octokit-tests",
  committer: {
    name: "some-bot",
    email: "bot@raae.codes"
  },
  sha: ""
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

const fetchLastWeeksData = async (params = OCTOKIT_PARAMS) => {
  try {
    const { data } = await octokit.repos.getContents({
      ...params,
      path: fileName(-1)
    });
    const content = Buffer.from(data.content, data.encoding).toString("utf8");
    return JSON.parse(content);
  } catch (error) {
    return {
      error: error.message
    };
  }
};

const saveThisWeeksContent = async (content, params = OCTOKIT_PARAMS) => {
  const thisWeeksFileName = fileName();
  params = {
    ...params,
    path: thisWeeksFileName,
    message: "This weeks stats" + thisWeeksFileName + ".",
    content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64")
  };

  try {
    const file = await octokit.repos.getContents(params);
    params.sha = file.data.sha;
  } catch (error) {
    //Silence
  }

  return octokit.repos.createOrUpdateFile(params);
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
