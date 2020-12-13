import { ArticleObj } from "@Types/article"

interface ArticleMap {
  [id: string]: ArticleObj
}

export class ArticlesManage {
  static instance: ArticlesManage
  articleMap!: ArticleMap
  static articles_desc: ArticleObj[]

  constructor () {
    this.init()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ArticlesManage()
    }
    return this.instance
  }

  init () {
    const _posts = window.localStorage.getItem('_posts') || '{}'
    this.articleMap = JSON.parse(_posts)
  }

  getArticleDate(article: ArticleObj) {
    return new Date(article.content.meta.time.replace(/-/g, '/') || article.stat.birthtime)
  }

  // 按时间倒序排序
  orderByBirthTimeDesc () {
    if (ArticlesManage.articles_desc) {
      return ArticlesManage.articles_desc
    }
    const articles = JSON.parse(JSON.stringify(this.articleMap))
    const keys = Object.keys(articles).sort((aKey: string, bKey: string) => {
      return this.getArticleDate(articles[bKey]).getTime() - this.getArticleDate(articles[aKey]).getTime()
    })
    const result = keys.map(key => {
      articles[key].id = key
      return articles[key]
    })
    ArticlesManage.articles_desc = result
    return result
  }

  getArticleById (id: string) {
    return JSON.parse(JSON.stringify(this.articleMap[id] || ''))
  }
}
