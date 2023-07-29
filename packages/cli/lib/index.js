import createCLI from './createCLI.js';
import createInitCommand from '@ncepu/init';
import './exception.js';

export default function (args) {
  const program = createCLI();
  
  // program
  //   .command('init [projectName]')
  //   .description('初始化项目')
  //   .option('-f, --force', '是否强制初始化项目', false)
  //   .action((name, opts) => {
  //     console.log('init', name, opts);
  //   });
  createInitCommand(program);
  
  program.parse(process.argv);
}
