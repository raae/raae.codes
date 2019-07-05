const addWeeks = require("date-fns/add_weeks");
const format = require("date-fns/format");
const { reduce } = require("lodash");
const { fetchProviderData } = require("./scraper");
const { fetchContent, saveContent } = require("./octokit");

const PROFILES = {
  twitter: ["raae"],
  instagram: ["benedicteraae", "raae.codes"]
};

const fileName = (weeksToAdd = 0) => {
  const date = addWeeks(new Date(), weeksToAdd);
  return format(date, "YYYY-MM-DD") + ".json";
};

const fetchThisWeeksData = async (profiles = PROFILES) => {
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

  profiles = flattenProfiles(profiles);

  const promises = profiles.map(profile => fetchProviderData(profile));
  const data = await Promise.all(promises);
  return deflattenData(data);
};

const generateThisWeeksProviderContent = (lastWeeksData, thisWeeksData) => {
  return reduce(
    thisWeeksData,
    (result, accountData, accountName) => {
      if (lastWeeksData && lastWeeksData[accountName]) {
        result[accountName] = {
          count: accountData.count,
          change: accountData.count - lastWeeksData[accountName].count
        };
      } else {
        result[accountName] = {
          count: accountData.count
        };
      }

      return result;
    },
    {}
  );
};

const generateThisWeeksContent = (lastWeeksData, thisWeeksData) => {
  if (lastWeeksData.error) return thisWeeksData;

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

exports.handler = async () => {
  const lastWeeksData = await fetchLastWeeksData();
  const thisWeeksData = await fetchThisWeeksData();
  const content = generateThisWeeksContent(lastWeeksData, thisWeeksData);

  const result = await saveThisWeeksContent(content);

  return {
    statusCode: result.error ? 500 : 200,
    body: JSON.stringify(
      {
        result
      },
      null,
      2
    )
  };
};
