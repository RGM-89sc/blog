export const setHeaderType = 'setHeaderType'
export type SetHeaderType = typeof setHeaderType

export const setCurrentArticle = 'setCurrentArticle'
export type SetCurrentArticle = typeof setCurrentArticle

export const setCurrentTab = 'setCurrentTab'
export type SetCurrentTab = typeof setCurrentTab

export interface Actions {
  type: SetHeaderType | SetCurrentArticle | SetCurrentTab
  [key: string]: any
}