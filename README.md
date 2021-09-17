## v1 自用
### 目前只支持单个目录
### 食用：

1. 安装依赖(全局安装依赖就不用忍受多几个文件夹/目录了，windows有NODE_PATH的坑)

```npm
npm i node-schedule
```

2. 复制一份cron_config.js.example修改为cron_config.js，并按照自己需求修改相应内容

3. 将jd脚本的目录复制到当前目录下

4. 获取定时数据文件(每次有新的定时脚本都得重新运行一遍)

```nodejs
node cron_get.js
```

5. 开启定时任务(定时数据文件更新需重新运行)

```nodejs
node cron_run.js
```

PS: 有能力的可以自己写脚本来设置自动更新
