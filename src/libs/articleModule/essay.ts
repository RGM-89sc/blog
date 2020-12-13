
import { Article } from './articles'
import { ArticleObj, ArticlesObj } from '@Types/article'

const _essays = Symbol('essays')
export default class Essay extends Article {
  private [_essays]: ArticlesObj

  constructor() {
    super()
    const essayFiles = require.context('../../assets/post', true, /\.md$/)
    this[_essays] = this.initArticles(essayFiles)
  }

  static getInstance() {
    return super.getInstance(Essay)
  }

  getArticles (id?: string): ArticleObj | ArticlesObj | undefined {
    if (!id) {
      return this[_essays]
    }
    return this.findArticleById(id)
  }

  findArticleById (id: string): ArticleObj | undefined {
    return this[_essays][id]
  }
}