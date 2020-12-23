import { setHeaderType, setCurrentArticle, setCurrentTab, setIsShowSetting, setTheme } from '@Types/actions'
import { CurrentArticleInfo } from '@Types/article'

export const setHeaderTypeAction = (value: string) => ({
  type: setHeaderType,
  value: value
})

export const setCurrentArticleAction = (value: CurrentArticleInfo) => ({
  type: setCurrentArticle,
  value: value
})

export const setCurrentTabAction = (value: string) => ({
  type: setCurrentTab,
  value: value
})

export const setIsShowSettingAction = (value: boolean) => ({
  type: setIsShowSetting,
  value: value
})

export const setThemeAction = (value: any) => ({
  type: setTheme,
  value: value
})