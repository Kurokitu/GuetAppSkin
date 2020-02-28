# Guet

### 注意事项
初次克隆项目请进入本目录 npm install 或 yarn install 
   
注意：需要打包生产环境版本请修改.env文件，否则会在上线后出现错误  
API_URL指向后端API地址，仅填写API主网址，末尾请勿添加斜杠  
修改完成后只需执行 npm run build 或 yarn build 即可，打包完成的文件在dist目录下，将dist内的所有文件上传至服务器即可  


### 关于GuetSDk:
SDK已经封装好了部分函数，可以直接调用  
详细请参考 /src/plugins/guetsdk 内的文件的注释示例以添加新的函数  
GuetSDK By Rubicon L  

### Project members
[Kurokitu](https://github.com/Kurokitu)  
[Rubicon L](https://github.com/thislight)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).