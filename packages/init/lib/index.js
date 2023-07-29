import Command from '@ncepu/command';
import { log } from '@ncepu/utils';

import createTemplate from './createTemplate.js';
import downloadTemplate from './downloadTemplate.js';
import installTemplate from './installTemplate.js';

class InitCommand extends Command {
  get command() {
    return 'init [projectName]';
  }

  get description() {
    return '初始化项目';
  }

  get options() {
    return [
      ['-f, --force', '是否强制初始化项目', false],
      ['-t, --type <type>', '项目类型（project/page）'],
      ['-tp, --template <template>', '模板名称']
    ];
  }

  async action([projectName, opts]) {
    log.verbose('init', projectName, opts);
    //1.选择项目模板，生成项目信息
    const selectedTemplate = await createTemplate(projectName, opts);
    log.verbose('template', selectedTemplate);
    //2.下载项目模板至缓存目录
    await downloadTemplate(selectedTemplate);
    //3.安装项目模板至项目目录
    await installTemplate(selectedTemplate, opts);
  }

  // preAction() {
  //   console.log('preAction');
  // }

  // postAction() {
  //   console.log('postAction');
  // }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;