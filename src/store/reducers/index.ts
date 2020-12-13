import { StoreState } from '@Types/storeState'
import { Actions, setHeaderType, setCurrentArticle } from '@Types/actions'
import { CurrentArticleInfo } from '@Types/article'

const defaultStoreState = {
  count: 0,
  headerType: 'default',
  currentArticle: {
    title: '',
    meta: {
      time: ''
    }
  }
}

function setHeaderTypeReducer (state: StoreState, value: string) {
  const state_copy: StoreState = JSON.parse(JSON.stringify(state))
  state_copy.headerType = value
  return state_copy
}

function setCurrentArticleReducer (state: StoreState, value: CurrentArticleInfo) {
  const state_copy: StoreState = JSON.parse(JSON.stringify(state))
  state_copy.currentArticle = value
  return state_copy
}

const reducers = (state: StoreState = defaultStoreState, action: Actions): StoreState => {
  const state_copy: StoreState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case setHeaderType:
      return setHeaderTypeReducer(state, action.value)
    case setCurrentArticle:
      return setCurrentArticleReducer(state, action.value)
    default:
      return state
  }
}

export default reducers