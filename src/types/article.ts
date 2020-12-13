export interface ArticleObj {
  html?: string
  meta?: {
    title?: string,
    [key: string]: any
  }
  [key: string]: any
}

export interface ArticlesObj {
  [key: string]: ArticleObj
}

export interface CurrentArticleInfo {
  title: string;
  meta: {
    time: string;
    [key: string]: any
  },
  [key: string]: any
}