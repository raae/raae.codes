const emoji = require('emoji-random');
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
  return format(date, "YYYY-MM-DD") + ".yml"
}

exports.handler = async (event, context, callback) => {
  const randomEmoji = emoji.random();
  let lastWeeksFileContents = "No content";

  const lastWeeksFileName = fileName(-1);
  const thisWeeksFileName = fileName();


  try {
    const {data} = await octokit.repos.getContents({
      ...PARAMS,
      path: lastWeeksFileName
    });
    lastWeeksFileContents = Buffer.from(data.content, data.encoding).toString();
  } catch (error) {
    /// Silence

  }

  const params = {
    ...PARAMS,
    path: thisWeeksFileName,
    message: "Content = " + randomEmoji + ".",
    content: Buffer.from(lastWeeksFileContents + "\n" + randomEmoji).toString('base64')
  }

  try {
    const file = await octokit.repos.getContents(params)
    params.sha = file.data.sha;
  } catch (error) {
    //Silence
  }

  const updatedFile = await octokit.repos.updateFile(params)

  // const result = await octokit.repos.updateFile(params)
  // console.log("TEST", JSON.stringify(result, null, 2))
  return {
    statusCode: 200,
    body: JSON.stringify({
      thisWeeksFileName,
      lastWeeksFileName,
      updatedFile
    }, null, 2)
  }
};