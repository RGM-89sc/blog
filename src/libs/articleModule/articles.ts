import { ArticleObj, ArticlesObj } from '@Types/article'
const md5 = require('blueimp-md5')

export class Article {
  static instance: any

  static getInstance(Class: any) {
    if (!this.instance) {
      this.instance = new Class()
    }
    return this.instance
  }

  initArticles (articlesContext: __WebpackModuleApi.RequireContext): ArticlesObj {
    return articlesContext.keys().reduce((modules: ArticlesObj, path: string) => {
      // 获取文章内容（经过loader处理）
      const module = articlesContext(path)
      // 计算html内容的md5并以此前8位作为该文章的唯一标识
      const id = md5(module.default.html).substring(0, 8)
      const name = path.replace(/^\.\/.*\.md$/, id)
      // 挂载到modules变量上
      modules[name] = module.default
      return modules
    }, {})
  }
}
