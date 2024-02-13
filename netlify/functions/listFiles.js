// netlify/functions/listFiles.js
const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = process.env;
    const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    const files = response.data.map((file) => file.name);

    return {
      statusCode: 200,
      body: JSON.stringify(files),
    };
  } catch (error) {
    console.error('Error fetching files:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
