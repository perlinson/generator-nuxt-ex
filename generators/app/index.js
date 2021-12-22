"use strict";
const fs = require("fs");
const path = require("path");
var _ = require("lodash");
const Generator = require("yeoman-generator");
var pluralize = require("pluralize");
var recast = require("recast");
var reservedWords = require("reserved-words");

module.exports = class extends Generator {
  Prompting() {
    var prompts = [
      {
        type: "input",
        name: "name",
        message: "What's the project name?",
        default: _.startCase(this.appname)
      },
    ];
    return this.prompt(prompts).then(
      function(props) {
        this.props = props;
        this.props.camel = _.camelCase(this.props.name);
        this.props.camels = pluralize(this.props.name);
        this.props.pascal = _.upperFirst(this.props.name);
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
     this.installDependencies({
       yarn: {force: true},
       npm: false,
       bower: false
     })
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
      // console.log("newPath:", newPath);
      paths.push(newPath);
      // console.log("paths:", paths);
    }
  });
}
