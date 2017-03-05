# car-system

> car

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
#### api接口
- 列出所有车型：ListKoubeiServlet.action
	+ get req none
	+ get res

- 口碑指数：CountPNServlet.action
	+ get req {category: "AMD"}
	+ get res

- 查找正负top5的词：CountTopWordsServlet.action
	+ get req {category: "AMD"}
	+ get res

- 点击正负top5词出现包含的句子:SearchSentencesServlet.action
	+ get req {opinionWord: "高",category: "AMD"}
	+ get res

- 点击更多：SelectMoreServlet.action
	+ get req {category: "AMD"}
	+ get res


#### 总结

这个暂时开发就告一段落了，只是一个普通的交互作业，界面丑的爆表。后台tomcat + java，前端vue2 + nodejs，数据展示使用echart3。