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
    (0, fs_1.mkdirSync)(dirName, { recursive: true });
}
function copy(src, dst) {
    ensureDirectoryExistence(dst);
    (0, fs_1.cpSync)(src, dst, { recursive: true });
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
    var publicDir = (0, path_1.resolve)(__dirname, './template/public');
    var rootDir = (0, path_1.resolve)(__dirname, './template/root');
    var srcDir = (0, path_1.resolve)(__dirname, './template/' + scriptExtenstion);
    var dstDir = (0, path_1.resolve)(__dirname, process.cwd() + '/');
    console.log('Template: ' + (templateTypescript ? 'typescript' : 'javascript'));
    copy((0, path_1.resolve)(srcDir, 'index.' + scriptExtenstion), (0, path_1.resolve)(dstDir, 'index.' + scriptExtenstion));
    copy((0, path_1.resolve)(srcDir, 'webpack.config.js'), (0, path_1.resolve)(dstDir, 'webpack.config.js'));
    copy((0, path_1.resolve)(srcDir, 'package.json'), (0, path_1.resolve)(dstDir, 'package.json'));
    copy(publicDir, (0, path_1.resolve)(dstDir, 'public'));
    copy(rootDir, dstDir);
    console.log('');
    execute('npm install');
}
setupFin((0, yargs_1.default)(process.argv).parse());
