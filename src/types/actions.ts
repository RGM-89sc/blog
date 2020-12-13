export const setHeaderType = 'setHeaderType'
export type SetHeaderType = typeof setHeaderType

export const setCurrentArticle = 'setCurrentArticle'
export type SetCurrentArticle = typeof setCurrentArticle

export interface Actions {
  type: SetHeaderType | SetCurrentArticle
  [key: string]: any
}