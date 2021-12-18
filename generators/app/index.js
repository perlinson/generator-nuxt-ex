"use strict";
const fs = require("fs");
const path = require("path");
var pluralize = require("pluralize");
var _ = require("lodash");
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    var prompts = [
      {
        type: "input",
        name: "kebab",
        message: "What's the model name?",
        default: "some-entity"
      },
      {
        type: "input",
        name: "appid",
        message: `Your project appid(default empty string)`,
        default: ""
      }
    ];
    return this.prompt(prompts).then(
      function(props) {
        this.props = props;
        this.props.camel = _.camelCase(this.props.kebab);
        this.props.camels = pluralize(this.props.camel);
        this.props.pascal = _.upperFirst(this.props.camel);
      }.bind(this)
    );
  }

  writing() {
    var props = this.props;
    let paths = [];
    readFiles(paths, "templates");

    paths.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        props
      );
    });
  }

  install() {
    // This.installDependencies();
  }
};

function readFiles(paths, dir) {
  const files = fs.readdirSync(path.join(__dirname, dir));

  files.forEach(file => {
    let newPath = path.join(dir, file);

    if (fs.statSync(path.join(__dirname, newPath)).isDirectory()) {
      // 是目录

      readFiles(paths, newPath); // 递归
    } else {
      // 是文件
      newPath = newPath.replace(/^templates(\/|\\)/, "");
      console.log("newPath:", newPath);
      paths.push(newPath);
      console.log("paths:", paths);
    }
  });
}
