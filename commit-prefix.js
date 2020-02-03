const fs = require('fs');
const path = require('path');
const commitFile = process.env.HUSKY_GIT_PARAMS;
const branchName = fs
  .readFileSync(path.resolve(__dirname, '.git/HEAD'))
  .toString();
const jiraCode = process.argv[2];

if (!jiraCode) {
  console.log(`
  Usage: node commit-prefix.js <jira-code>
     Ex: node commit-prefix.js CDEV
  `);
  process.exit(0);
}

if (!commitFile) {
  console.error(
    'No commit file found from husky environment variable(HUSKY_GIT_PARAMS). It is ment to be used as a git hook with huskey.'
  );
  process.exit(0);
}

const commitMessage = fs
  .readFileSync(path.resolve(__dirname, commitFile))
  .toString();

// check if commit message already has the ticket number in it
if (commitMessage.match(jiraCode)) {
  process.exit(0);
}

// else prepend with ticket number
const ticketMatcher = new RegExp(`(${jiraCode}-\\d+)`, 'gi');
const [ticket] = branchName.match(ticketMatcher) || [null];

if (!ticket) {
  console.log(`No ticket number matched.`);
  process.exit(0);
}

const formattedCommit = `${ticket}: ${commitMessage}`;
fs.writeFileSync(commitFile, formattedCommit);
