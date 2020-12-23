export const setHeaderType = 'setHeaderType'
export type SetHeaderType = typeof setHeaderType

export const setCurrentArticle = 'setCurrentArticle'
export type SetCurrentArticle = typeof setCurrentArticle

export const setCurrentTab = 'setCurrentTab'
export type SetCurrentTab = typeof setCurrentTab

export const setIsShowSetting = 'setIsShowSetting'
export type SetIsShowSetting = typeof setIsShowSetting

export const setTheme = 'setTheme'
export type SetTheme = typeof setTheme

export interface Actions {
  type: SetHeaderType | SetCurrentArticle | SetCurrentTab | SetIsShowSetting | SetTheme
  [key: string]: any
}