const fs = require('fs');
const { mainDir, extendData } = require('./cron_config.js');

fs.readdir(mainDir, (err, files) => {
  if (err) throw err;
  const cron_data = {};
  files.forEach(file => {
    if (file.endsWith('.js')) {
      let data = fs.readFileSync(`${mainDir}/${file}`, 'utf-8');
      const lines = data.toString('utf-8').split('\n');
      let r = lines.filter(line => {
        if (line.includes(file) ? line.includes('*') : false) {
          if (!line.includes('@')) return true;
        }
      });
      if (r.length > 0) {
        const reg = /cronexp=(.*?),/
        const result = reg.exec(r[0]);
        if (result !== null){
          cron = result[1].replace(/\"/g, '');
        }else{
          const reg = new RegExp(file);
          cron = r[0].replace(/\/\//,"").replace(/cron/, "").replace(/script-path*/, "").replace(/\"/g, "").replace(/^\s+/,"").replace(/, tag.*/, "").replace(/http.*\.js/, "").replace(/[\u4e00-\u9fa5]/g,"").replace(reg, "").replace(/\s+$/, "");
        }
        cron_data[file] = cron;
      }
    }
  });
  cron_data['jd_bean_sign.js'] = '5 0 * * *';
  delete cron_data['JD_DailyBonus.js'];
  Object.keys(extendData).forEach(key => {
    cron_data[key] = extendData[key];
  });
  const cron_data_str = JSON.stringify(cron_data, null, "\t");
  fs.writeFile('cron_data.json', cron_data_str, (err) => {
    if (err) throw err;
  })
});

