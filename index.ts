#!/usr/bin/env node

import { execSync } from 'child_process';
import {dirname, resolve} from 'path';
import {copyFileSync, existsSync, mkdirSync} from 'fs';
import yargs from 'yargs';

function ensureDirectoryExistence(filePath) {
  const dirName = dirname(filePath);
  if(existsSync(dirName))
    return true;
  ensureDirectoryExistence(dirName);
  mkdirSync(dirName);
}

function copy(src: string, dst: string) {
  ensureDirectoryExistence(dst);
  copyFileSync(src, dst);
  console.log('Copied: '+dst);
}

function execute(script: string) {
  console.log('> '+script);
  execSync(script, {stdio: 'inherit'});
}

function setupFin(args) {
  console.log('@nez-fin/setup v1.0.0\n');
  const templateTypescript = args.hasOwnProperty('typescriptTemplate');
  const scriptExtenstion   = templateTypescript ? 'ts' : 'js';
  const tplRoot = resolve(__dirname, './template/');
  const srcRoot = resolve(__dirname, './template/'+scriptExtenstion);
  const dstRoot = resolve(__dirname, process.cwd()+'/');
  console.log('Template: '+(templateTypescript ? 'typescript' : 'javascript'));
  copy(resolve(srcRoot, 'index.'+scriptExtenstion), resolve(dstRoot, 'index.'+scriptExtenstion));
  copy(resolve(tplRoot, 'index.html'), resolve(dstRoot, 'public/index.html'));
  copy(resolve(tplRoot, 'index.css'), resolve(dstRoot, 'index.css'));
  copy(resolve(srcRoot, 'webpack.config.js'), resolve(dstRoot, 'webpack.config.js'));
  copy(resolve(srcRoot, 'package.json'), resolve(dstRoot, 'package.json'));
  console.log('');
  execute('npm install');
}

setupFin(yargs(process.argv).parse());

