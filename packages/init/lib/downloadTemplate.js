import path from 'node:path';
import { pathExistsSync } from 'path-exists';
import fse from 'fs-extra';
import ora from 'ora';
import { execa } from 'execa';
import { printErrorLog, log } from '@ncepu/utils';

function getCacheDir(targetPath) {
  return path.resolve(targetPath, 'node_modules');
}

function makeCacheDir(targetPath) {
  const cacheDir = getCacheDir(targetPath);
  if (!pathExistsSync(cacheDir)) {
    fse.mkdirpSync(cacheDir);
  }
}

async function downloadAddTemplate(targetPath, template) {
  const { npmName, version } = template;
  const installCommand = 'npm';
  const installArgs = ['install', `${npmName}@${version}`, '--save'];
  const cwd = targetPath;
  log.verbose('installArgs', installArgs);
  log.verbose('cwd', cwd);
  const subprocess = execa(installCommand, installArgs, {
    cwd
  });
  await subprocess;
}

export default async function downloadTemplate(selectedTemplate) {
  const { targetPath, template } = selectedTemplate;
  makeCacheDir(targetPath);
  const spinner = ora('正在下载项目模板...').start();
  try {
    await downloadAddTemplate(targetPath, template)
    spinner.stop();
    log.success('下载模板成功');
  } catch (e) {
    spinner.stop();
    printErrorLog(e);
  }
}