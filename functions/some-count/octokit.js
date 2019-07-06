const Octokit = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const OCTOKIT_PARAMS = {
  owner: "raae",
  repo: "octokit-tests",
  committer: {
    name: "some-bot",
    email: "bot@raae.codes"
  }
};

exports.fetchContent = async ({ path }, params = OCTOKIT_PARAMS) => {
  params = {
    ...params,
    path: path
  };

  try {
    const { data } = await octokit.repos.getContents(params);
    const content = Buffer.from(data.content, data.encoding).toString("utf8");
    return JSON.parse(content);
  } catch (error) {
    return {
      error: error.message
    };
  }
};

exports.saveContent = async (
  { path, content, message },
  params = OCTOKIT_PARAMS
) => {
  params = {
    ...params,
    path: path,
    message: message,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64")
  };

  try {
    const file = await octokit.repos.getContents(params);
    params.sha = file.data.sha;
  } catch (error) {
    //Silence
  }

  try {
    await octokit.repos.createOrUpdateFile(params);
    return {
      ...content,
      repo: "REPOSITORY_URL " + process.env.REPOSITORY_URL,
      branch: "BRANCH " + process.env.BRANCH,
      url: "URL " + process.env.URL,
      deployUrl: "DEPLOY_URL " + process.env.DEPLOY_URL
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
};
