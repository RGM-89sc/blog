import { StoreState } from '@Types/storeState'
import { Actions, setHeaderType, setCurrentArticle, setCurrentTab } from '@Types/actions'
import { CurrentArticleInfo } from '@Types/article'

const defaultStoreState = {
  count: 0,
  headerType: 'default',
  currentArticle: {
    title: '',
    meta: {
      time: ''
    }
  },
  currentTab: ''
}

function copyStateStore<T>(state: T): T {
  return JSON.parse(JSON.stringify(state))
}

function setHeaderTypeReducer (state: StoreState, value: string) {
  const state_copy = copyStateStore(state)
  state_copy.headerType = value
  return state_copy
}

function setCurrentArticleReducer (state: StoreState, value: CurrentArticleInfo) {
  const state_copy = copyStateStore(state)
  state_copy.currentArticle = value
  return state_copy
}

function setCurrentTabReducer(state: StoreState, value: string) {
  const state_copy = copyStateStore(state)
  state_copy.currentTab = value
  return state_copy

}

const reducers = (state: StoreState = defaultStoreState, action: Actions): StoreState => {
  switch (action.type) {
    case setHeaderType:
      return setHeaderTypeReducer(state, action.value)
    case setCurrentArticle:
      return setCurrentArticleReducer(state, action.value)
    case setCurrentTab:
      return setCurrentTabReducer(state, action.value)
    default:
      return state
  }
}

export default reducers