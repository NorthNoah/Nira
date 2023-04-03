## 项目介绍：提供多人协作、共同解决问题的平台。根据用户权限提供了不同的工作界面，可以编辑/创建所属团队项目状态，提供了更方便进行团队工作的任务看板，任务组的功能。
## 技术栈：React + TS + Antd + Redux-Toolkit + React-Query + Prettier + Commitlint
## 项目演示地址：http://north-noah.top
## 备用演示地址：https://imooc-jira.vercel.app/
## 项目特点
* 基于JWT技术，实现前台的注册和登录鉴权模块；
* 抽取数据请求、防抖、增删改查等通用Hook，封装了更为方便发送http请求的hook，获取、设置url参数的hook等；
* 使用Context管理用户信息，借助Hook管理路由参数、模态框参数等数据，利用React-Query管理网络请求相关数据，对于不同类型的数据采用不同方式管理，使得项目易于维护、逻辑清晰；
* 使用CSS-in-JS书写样式并将常用样式抽象为可复用的组件，提升了开发效率；
* 使用React-Query完成了乐观更新，对于可预测的请求进行预更新，解决了因网络慢长时间无法反馈的问题。
## 项目运行
* 依赖安装 yarn install
* 本地运行Mock服务器 yarn start json-server
* 运行项目 yarn start
