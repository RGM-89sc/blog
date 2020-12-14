/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import { setHeaderTypeAction } from '@Store/actions'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import { ArticlesManage } from '@Tools/articlesManage'
import useContentWidth from '@Hooks/useContentWidth'

interface IProps {
  store: StoreState
  setHeaderType: (headerType: string) => any
}

function CateoryList(props: IProps) {
  const contentWidth = useContentWidth()

  const categoryListCss = css`
    box-sizing: border-box;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    width: ${contentWidth};
  `

  const articlesManage = ArticlesManage.getInstance()
  const tagsMap = articlesManage.getAllTags()
  console.log(tagsMap)
  
  return (
    <div css={categoryListCss}>
      分类
    </div>
  )
}

function mapStateToProps (state: any) {
  return {
    store: state
  }
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    setHeaderType: (headerType: string) => dispatch(setHeaderTypeAction(headerType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(CateoryList))