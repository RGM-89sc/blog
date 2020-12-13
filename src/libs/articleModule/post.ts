
import { Article } from './articles'
import { ArticleObj, ArticlesObj } from '@Types/article'

const _posts = Symbol('posts')
export default class Post extends Article {
  private [_posts]: ArticlesObj

  constructor() {
    super()
    const postFiles = require.context('../../assets/post', true, /\.md$/)
    this[_posts] = this.initArticles(postFiles)
  }

  static getInstance() {
    return super.getInstance(Post)
  }

  getArticles (skip: number, total: number = 10): ArticleObj | ArticlesObj | undefined {
    return this[_posts]
  }

  findArticleById (id: string): ArticleObj | undefined {
    return this[_posts][id]
  }
}