const fs = require('fs');
const path = './data.json'; 
function readData() {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
  return {}; 
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { readData, writeData };
