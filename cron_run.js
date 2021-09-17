const schedule = require('node-schedule');
const fs = require('fs');
const { exec } = require('child_process');
const { logspath } = require('./cron_config.js');

// 查看日志目录是否存在,如果不存在,先创建
const fileExists = fs.existsSync(logspath);
//console.log('logsDirExists', fileExists);
if (!fileExists) {
  fs.mkdirSync(logspath);
}

console.log('Cron job started, Press Ctrl+C to exit');
const rawdata = fs.readFileSync('cron_data.json');
const cron_data = JSON.parse(rawdata);
Object.keys(cron_data).forEach(key => {
  schedule.scheduleJob(cron_data[key], function(){
    let logfile = logspath + key + '.log';
    exec(`node ${key}`, { cwd: './jdmain' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      if(stderr){
        console.log(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      fs.writeFile(logfile, stdout, (err) => {
        if (err) throw err;
      })
    });
  });
});
