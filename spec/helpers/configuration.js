const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const { JSDOM } = require("jsdom");
const dom = new JSDOM(index);
global.document = dom.window.document;
global.window = dom.window;
