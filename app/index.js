'use strict';

const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(arg1, optns) {
    super(arg1, optns);
  }

  initializing() {
    this.log('init');
  }

  prompting() {
    this.log(yosay('\'Allo \'allo! Out of the box I include Material Design lite, Sass, Babel and a gulpfile to build your app.'));

    const prompts = [{
      message: 'Site name',
      name: 'siteName',
      default: 'generator-web-starter-kit',
    }, {
      message: 'Site Desciption',
      name: 'siteDescription',
      default: 'generator-web-starter-kit',
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'Which additional features would you like to include?',
      choices: [{
        name: 'Material Design Lite',
        value: 'includeMDL',
        checked: true
      }, {
        name: 'Babel',
        value: 'includeBabel',
        checked: true,
      }, {
        name: 'Sass',
        value: 'includeSass',
        checked: true
      }]
    }];

    return this.prompt(prompts).then((answers) => {
      this.log(answers);
      const features = answers.features;

      const hasFeature = (feature) => features && features.indexOf(feature) !== -1;

      this.siteName = answers.siteName;
      this.siteDescription = answers.siteDescription
      this.includeMDL = hasFeature('includeMDL');
      this.includeBabel = hasFeature('includeBabel');
      this.includeSass = hasFeature('includeSass');
    });
  }

  writing() {
    this._writingPackageJSON();
    this._writingGitIgnore();
    this._writingEditorConfig();
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        siteName: this.siteName,
        siteDescription: this.siteDescription
      }
    );
  }

  _writingGitIgnore() {
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  _writingEditorConfig() {
    this.fs.copyTpl(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }

};
