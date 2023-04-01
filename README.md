## 项目介绍：NH-Trip北境云旅是一个移动端页面，提供查询旅游民宿，以及民宿详细信息展示等功能
## 技术栈：React + TS + Antd + Redux-Toolkit + React-Query + Prettier + Commitlint
## 项目演示地址：http://8.142.115.219
## 项目特点
* 使用Vant组件库，对轮播图组件进行二次封装
* 抽取日期显示，监听滚动等公共组件
* 对首页数据展示进行分层请求和节流优化
* 详情页使用索引匹配算法进行页面滚动匹配
* 二次封装Axios，设置请求和响应拦截器
* 详情页继承百度地图，可以获取用户位置信息
## 项目运行
* 依赖安装 yarn install
* 本地运行Mock服务器 yarn start json-server
* 运行项目 yarn start
