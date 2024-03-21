#!/usr/bin/env node

import { execSync } from 'child_process';
import {dirname, resolve} from 'path';
import {cpSync, existsSync, mkdirSync} from 'fs';
import yargs from 'yargs';


function ensureDirectoryExistence(filePath) {
  const dirName = dirname(filePath);
  if(existsSync(dirName))
    return true;
  mkdirSync(dirName, { recursive: true });
}

function copy(src: string, dst: string) {
  ensureDirectoryExistence(dst);
  cpSync(src, dst, {recursive: true});
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
  const publicDir = resolve(__dirname, './template/public');
  const rootDir   = resolve(__dirname, './template/root');
  const srcDir = resolve(__dirname, './template/'+scriptExtenstion);
  const dstDir = resolve(__dirname, process.cwd()+'/');
  console.log('Template: '+(templateTypescript ? 'typescript' : 'javascript'));
  copy(resolve(srcDir, 'index.'+scriptExtenstion), resolve(dstDir, 'index.'+scriptExtenstion));
  copy(resolve(srcDir, 'webpack.config.js'), resolve(dstDir, 'webpack.config.js'));
  copy(resolve(srcDir, 'package.json'), resolve(dstDir, 'package.json'));
  copy(publicDir, resolve(dstDir, 'public'));
  copy(rootDir, dstDir);
  console.log('');
  execute('npm install');
}

setupFin(yargs(process.argv).parse());

