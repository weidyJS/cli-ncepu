#!/usr/bin/env node

import importLocal from 'import-local';
import { log } from '@ncepu/utils';
import { filename } from 'dirname-filename-esm';
import entry from '../lib/index.js';

const __filename = filename(import.meta);

if (importLocal(__filename)) { 
  log.info('cli', '正在使用 cli 本地版本');
} else {
  entry(process.argv.slice(2));
}