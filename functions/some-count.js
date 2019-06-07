const cheerio = require('cheerio')
const axios = require("axios")
const addWeeks = require('date-fns/add_weeks')
const format = require('date-fns/format')
const Octokit = require('@octokit/rest')
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
 })


const PARAMS = {
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
  return format(date, "YYYY-MM-DD") + ".json"
}

const fetchTwitterData = async () => {
  const data = {}
  try{
    const page = await axios.get("https://twitter.com/raae");
    const $ = cheerio.load(page.data);
    const element$ = $(".ProfileNav-item--followers .ProfileNav-value");
    data.count = parseInt(element$.attr('data-count'), 10);
  } catch(error) {
    data.error = error.message
  }

  return data;
}

const fetchInstagramData = async () => {
  const data = {}
  try{
    const page = await axios.get("https://www.instagram.com/raae.codes/?__a=1");
    const json = page.data;
    data.count = json.graphql.user.edge_followed_by.count
  } catch(error) {
    data.error = error.message
  }

  return data;
}

const fetchThisWeeksData = async () => {
  const data = {
    twitter: await fetchTwitterData(),
    instagram: await fetchInstagramData()
  }

  return data;
}

const fetchLastWeeksData = async () => {
  try {
    const {data} = await octokit.repos.getContents({
      ...PARAMS,
      path: fileName(-1)
    });
    const content = Buffer.from(data.content, data.encoding).toString('utf8');
    return JSON.parse(content)
  } catch (error) {
    return {
      error: error.message
    };
  }
}

const generateThisWeeksContent = (lastWeeksData, thisWeeksData) => {
  if(lastWeeksData.error) return thisWeeksData;

  return {
    twitter: {
      count: thisWeeksData.twitter.count,
      change: thisWeeksData.twitter.count - lastWeeksData.twitter.count
    },
    instagram: {
      count: thisWeeksData.instagram.count,
      change: thisWeeksData.instagram.count - lastWeeksData.instagram.count
    },
  }
}

exports.handler = async () => {
  const thisWeeksFileName = fileName();
  const lastWeeksData = await fetchLastWeeksData();
  const thisWeeksData = await fetchThisWeeksData();
  const content = generateThisWeeksContent(lastWeeksData, thisWeeksData);

  const params = {
    ...PARAMS,
    path: thisWeeksFileName,
    message: "This weeks stats" + thisWeeksFileName + ".",
    content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64')
  }

  try {
    const file = await octokit.repos.getContents(params)
    params.sha = file.data.sha;
  } catch (error) {
    //Silence
  }

  await octokit.repos.updateFile(params)

  return {
    statusCode: 200,
    body: JSON.stringify({
      content
    }, null, 2)
  }
};