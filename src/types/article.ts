export interface ArticleObj {
  name?: string
  content: {
    [key: string]: any
  }
  stat: {
    [key: string]: any
  }
  [key: string]: any
}

export interface ArticlesObj {
  [key: string]: ArticleObj
}

export interface TagsMapItem {
  count: number
  [key: string]: any
}

export interface TagsMap {
  [tag: string]: TagsMapItem
}

export interface CurrentArticleInfo {
  title: string;
  meta: {
    time: string;
    [key: string]: any
  },
  [key: string]: any
}