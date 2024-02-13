const owner = 'smallgateKEA';
const repo = 'fajlok';
const path = '/'; // or just '/' for the root directory

const accessToken = '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'; // Replace with your actual access token

const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        // Process the data as needed (e.g., extract file names)
        const fileNames = data.map(file => file.name);
        
        // Append the file names to the HTML element with id 'fileList'
        const fileListElement = document.getElementById('fileList');
        fileNames.forEach(fileName => {
          const listItem = document.createElement('li');
          listItem.textContent = fileName;
          fileListElement.appendChild(listItem);
        });
      } else {
        console.error('Unexpected response format:', data);
      }
    })
    .catch(error => console.error('Error fetching data:', error));