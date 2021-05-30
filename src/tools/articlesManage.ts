import { ArticleObj, TagsMap } from "@Types/article"

interface ArticleMap {
  [id: string]: ArticleObj
}

export class ArticlesManage {
  static instance: ArticlesManage
  articleMap!: ArticleMap
  static articles_desc: ArticleObj[]
  static tagsMap: TagsMap

  constructor() {
    this.init()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ArticlesManage()
    }
    return this.instance
  }

  init() {
    const _posts = window.localStorage.getItem('_posts') || '{}'
    this.articleMap = JSON.parse(_posts)
  }

  private deepClone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data || ''))
  }

  getArticleDate(article: ArticleObj): Date {
    return new Date(article.content.meta.time.replace(/-/g, '/') || article.stat.birthtime)
  }

  // 按时间倒序排序
  orderByBirthTimeDesc(): ArticleObj[] {
    if (ArticlesManage.articles_desc) {
      return ArticlesManage.articles_desc
    }
    const articles = this.deepClone(this.articleMap)
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

  getArticlesByCategory(category: string): ArticleObj[] {
    const articles = this.orderByBirthTimeDesc()
    return articles.filter((article: ArticleObj) => article.content.meta.tags.includes(category))
  }

  getArticleById(id: string): ArticleObj {
    return this.deepClone(this.articleMap[id])
  }

  getAllTags(): TagsMap {
    if (ArticlesManage.tagsMap instanceof Array) {
      return ArticlesManage.tagsMap
    }
    const tagsMap: TagsMap = {}
    const articles = this.deepClone(this.articleMap)
    Object.values<ArticleObj>(articles).forEach((article: ArticleObj) => {
      const articleTags = article.content.meta.tags
      articleTags.length > 0 && articleTags.forEach((tag: string) => {
        tagsMap[tag] ? tagsMap[tag].count++ : tagsMap[tag] = { count: 1 }
      })
    })
    ArticlesManage.tagsMap = tagsMap
    return tagsMap
  }

  getArticlesByKeyword(keyword: string): ArticleObj[] {
    if (!keyword) {
      return []
    }
    return this.orderByBirthTimeDesc().filter(article => {
      if (new RegExp(keyword).test(article.name || '')) {
        return true
      }
      return false
    })
  }
}
