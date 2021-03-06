const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const inquirer = require('inquirer')
const generatePage = require('./generate.js')
const gulpLoadPlugins = require('gulp-load-plugins')
const jsonFormat = require('gulp-json-format');
const plugins = gulpLoadPlugins()

function addFile(options) {
  const files = generatePage({
    root: path.resolve(__dirname, `../src/${options.moduleType}/`),
    name: options.pageName,
    type: options.moduleType,
    less: options.styleType === 'less',
    scss: options.styleType === 'scss',
    wxss: options.styleType === 'wxss',
    html: options.HtmlType === 'html',
    jade: options.HtmlType === 'jade',
    wxml: options.HtmlType === 'wxml',
    json: options.needConfig,
    preJs: options.preLoadType
  })
  files.forEach && files.forEach(file => plugins.util.log('[generate]', file))
  return files
}

function addJson(options) {
  const filename = path.resolve(__dirname, '../src/app.json')
  let result = require('../src/app.json')
  result.pages.push(`pages/${options.pageName}/${options.pageName}`)
  result = JSON.stringify(result, null, "\t")
  fs.writeFileSync(filename, result)
}

function createFile() {
  inquirer.prompt([{
      type: 'list',
      name: 'moduleType',
      message: 'Select a module type',
      choices: ['pages', 'components', 'module'],
      default: 'pages'
    }, {
      type: 'input',
      name: 'pageName',
      message: 'Input the page name',
      default: 'index'
    }, {
      type: 'confirm',
      name: 'needConfig',
      message: 'Do you need a configuration file (default true)',
      default: true
    }, {
      type: 'list',
      name: 'styleType',
      message: 'Select a style framework',
      choices: ['less', 'scss', 'wxss'],
      default: 'scss'
    }, {
      type: 'list',
      name: 'HtmlType',
      message: 'Select a Html framework',
      choices: ['html', 'jade', 'wxml'],
      default: 'jade'
    }, {
      type: 'confirm',
      name: 'preLoadType',
      message: 'Whether to enable preloading (default true)',
      default: true
    }]).then(options => {
      const {
        pageName,
        moduleType
      } = options
      const array = pageName.split(' ')
      if (array.length == 0) {
        const res = addFile(options)
        if (res && moduleType == 'pages') addJson(options)
      }
      if (array.length != 0) {
        array.forEach(item => {
          options.pageName = item
          const res = addFile(options)
          if (res && moduleType == 'pages') addJson(options)
        });
      }
    })
    .catch(err => {
      throw new plugins.util.PluginError('generate', err)
    })
}

createFile()
