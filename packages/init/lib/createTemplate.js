import path from 'node:path';
import { homedir } from 'node:os';
import { log, makeList, makeInput, getLastVersion } from '@ncepu/utils'

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
const ADD_TEMPLATE = [
  {
    name: 'vue3项目模板',
    value: 'template-vue3',
    npmName: '@ncepu/template-vue3',
    version: '1.0.1'
  },
  {
    name: 'react项目模板',
    value: 'template-react18',
    npmName: '@ncepu/template-react18',
    version: '1.0.0'
  },
  {
    name: 'vue-element-admin项目模板',
    value: 'template-vue-element-admin',
    npmName: '@ncepu/template-vue-element-admin',
    version: '1.0.0'
  }
]
const ADD_TYPE = [
  {
    name: '项目',
    value: ADD_TYPE_PROJECT
  },
  {
    name: '页面',
    value: ADD_TYPE_PAGE
  }
]
const TEMP_HOME = '.cli-ncepu'

// 获取创建类型
function getAddType() { 
  return makeList({
    choices: ADD_TYPE,
    message: '请选择初始化类型',
    defaultValue: ADD_TYPE_PROJECT
  })
}

// 获取项目名称
function getAddName() {
  return makeInput({
    message: '请输入项目名称',
    defaultValue: '',
    validate(v) {
      if (v.length > 0) {
        return true
      }
      return '项目名称不能为空'
    }
  })
}

// 选择项目模板
function getAddTemplate() {
  return makeList({
    choices: ADD_TEMPLATE,
    message: '请选择项目模板',
  })
}

// 安装缓存目录
function makeTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate')
}

export default async function createTemplate(name, opts) {
  const { type = null, template = null } = opts;
  let addType; // 创建项目类型
  let addName; // 项目名称
  let selectTedTemplate; // 项目模板
  if (type) {
    addType = type;
  } else {
    addType = await getAddType();
  }
  log.verbose('addType', addType);
  if (addType === ADD_TYPE_PROJECT) {
    if (name) {
      addName = name;
    } else {
      addName = await getAddName();
    }
    log.verbose('addName', addName);
    if (template) {
      selectTedTemplate = ADD_TEMPLATE.find(tp => tp.value === template);
      if (!selectTedTemplate) {
        throw new Error('项目模板不存在')
      }
    } else {
      const addTemplate = await getAddTemplate();
      selectTedTemplate = ADD_TEMPLATE.find(template => template.value === addTemplate);
      log.verbose('addTemplate', addTemplate);
    }
    //获取最新版本号
    const latestVersion = await getLastVersion(selectTedTemplate.npmName);
    log.verbose('latestVersion', latestVersion);
    selectTedTemplate.version = latestVersion;
    const targetPath = makeTargetPath();
    return {
      type: addType,
      name: addName,
      template: selectTedTemplate,
      targetPath
    }
  } else {
    throw new Error(`创建的项目类型 ${addType} 不支持`)
  }
}