const pageConfig = require('./page.config');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const data = require('./tpl/data.js');

pageConfig.forEach(page => {
  let filePath = "./tpl/pages/" + page.html;
  let outputPath = "./src/pages/" + page.html;
  let currentPath = path.resolve(filePath, '../') + "/";
  let _data = Object.assign(data[page.name], {
    currentPath
  });
  let content = fs.readFileSync(filePath, "utf-8");
  let template = ejs.render(content, _data, {});
  fs.writeFileSync(outputPath, template);
});