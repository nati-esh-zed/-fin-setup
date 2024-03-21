#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = require("path");
var fs_1 = require("fs");
var yargs_1 = require("yargs");
function ensureDirectoryExistence(filePath) {
    var dirName = (0, path_1.dirname)(filePath);
    if ((0, fs_1.existsSync)(dirName))
        return true;
    ensureDirectoryExistence(dirName);
    (0, fs_1.mkdirSync)(dirName);
}
function copy(src, dst) {
    ensureDirectoryExistence(dst);
    (0, fs_1.copyFileSync)(src, dst);
    console.log('Copied: ' + dst);
}
function execute(script) {
    console.log('> ' + script);
    (0, child_process_1.execSync)(script, { stdio: 'inherit' });
}
function setupFin(args) {
    console.log('@nez-fin/setup v1.0.0\n');
    var templateTypescript = args.hasOwnProperty('typescriptTemplate');
    var scriptExtenstion = templateTypescript ? 'ts' : 'js';
    var tplRoot = (0, path_1.resolve)(__dirname, './template/');
    var srcRoot = (0, path_1.resolve)(__dirname, './template/' + scriptExtenstion);
    var dstRoot = (0, path_1.resolve)(__dirname, process.cwd() + '/');
    console.log('Template: ' + (templateTypescript ? 'typescript' : 'javascript'));
    copy((0, path_1.resolve)(srcRoot, 'index.' + scriptExtenstion), (0, path_1.resolve)(dstRoot, 'index.' + scriptExtenstion));
    copy((0, path_1.resolve)(tplRoot, 'index.html'), (0, path_1.resolve)(dstRoot, 'public/index.html'));
    copy((0, path_1.resolve)(tplRoot, 'index.css'), (0, path_1.resolve)(dstRoot, 'index.css'));
    copy((0, path_1.resolve)(srcRoot, 'webpack.config.js'), (0, path_1.resolve)(dstRoot, 'webpack.config.js'));
    copy((0, path_1.resolve)(srcRoot, 'package.json'), (0, path_1.resolve)(dstRoot, 'package.json'));
    console.log('');
    execute('npm install');
}
setupFin((0, yargs_1.default)(process.argv).parse());
