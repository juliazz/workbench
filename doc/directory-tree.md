## #项目目录结构#
```bash
├── README.md                                    // 项目介绍
├── bin                                          // 自定义预处理脚本
│   ├── beforeCompile.sh                         // 
│   ├── beforePreview.sh                         // 
│   └── beforeUpload.sh                          // 
├── build                                        // 项目工程脚本
│   ├── build.js                                 // 
│   ├── exec.js                                  // 
│   └── utils.js                                 // 
├── config                                       // 环境配置文件
│   ├── dev.env.js                               // 
│   ├── index.js                                 // 
│   ├── prod.env.js                              // 
│   └── uat.env.js                               // 
├── config.js                                    // 环境配置文件生成预配置
├── dist                                         // 项目输出文件(小程序目录指向)
├── doc                                          // 项目介绍
│   ├── api-website.md                           // 
│   ├── api-westore.md                           // 
│   ├── git-flow.md                              // 
│   ├── directory-tree.md                        // 
│   └── usage.md                                 // 
├── generate                                     // 项目创建页面脚本
├── node_modules                                 // 项目依赖文件
├── package-lock.json                            // 
├── package.json                                 // 项目配置依赖文件
├── project.config.json                          // 小程序工程文件
└── src                                          // 小程序开发目录
    ├── api                                      // 接口目录
    ├── app.js                                   // 
    ├── app.json                                 // 
    ├── app.wxss                                 // 
    ├── assets                                   // 小程序资源文件
    │   ├── fonts                                // 
    │   ├── images                               // 
    │   └── style                                // 
    ├── components                               // 小程序功能组件
    ├── config.js                                // 小程序配置文件(由环境配置文件生成)
    ├── constant                                 // 小程序静态数据文件
    ├── custom-nav-bar                           // 自定义header
    ├── custom-tab-bar                           // 自定义tabbar
    ├── mixins                                   // 页面 & 组件公用方法
    │   ├── behavior.js                          // 
    │   └── pages.js                             // 
    ├── module                                   // 小程序业务组件
    ├── pages                                    // 小程序页面
    ├── sitemap.json                             // 
    ├── utils                                    // 
    │   ├── auth-extend                          // 小程序授权业务重定义
    │   │   ├── index.js                         // 
    │   │   └── lib                              // 
    │   ├── base64code.js                        // 
    │   ├── extend.js                            // 小程序App, Page加入全局的方法
    │   ├── index.js                             // 
    │   ├── lodash.js                            // lodash工具函数
    │   ├── logger.js                            // 日志系统文件
    │   ├── normalizeStyle.js                    // 
    │   ├── preload.js                           // 小程序预加载接口配置
    │   ├── request.js                           // 小程序接口封装
    │   ├── selectQuery.js                       // 
    │   ├── storage-manage.js                    // 小程序缓存管理
    │   ├── storage.js                           // 小程序缓存封装
    │   ├── token-manage.js                      // 小程序静默登录
    │   ├── track-minp                           // 小程序数据埋点
    │   ├── update-manager.js                    // 小程序更新管理
    │   ├── utils.js                             // 自定义工具函数
    │   ├── wx-promise.js                        // 小程序wx.** promise化
    │   └── wx-rss.js                            // 小程序通信
    └── vendor                                   // vendor工具
```
