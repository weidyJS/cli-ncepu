import path from 'node:path';
import { program } from 'commander';
import semver from 'semver';
import chalk from 'chalk';
import fse from 'fs-extra';
import { dirname } from 'dirname-filename-esm';
import { log } from '@ncepu/utils';

const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, '../package.json');
let pkg = fse.readJSONSync(pkgPath);

const LOWEST_NODE_VERSION = '14.0.0';

function checkNodeVersion() {
  log.verbose('node version', process.version)
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) { 
    throw new Error(chalk.red(`ncepu-cli 需要安装 v${LOWEST_NODE_VERSION} 以上版本的 Node.js`))
  }
}

function preAction() {
  //检查Node版本
  checkNodeVersion();
}

export default function createCLI() {
  log.info('version', pkg.version)
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', preAction);
  
  program.on('option:debug', () => {
    if (program.opts().debug) {
      log.verbose('debug', '开启调试模式');
    } 
  });

  program.on('command:*', (obj) => { 
    log.error('未知的命令: ' + obj[0]);
  });

  return program;
}