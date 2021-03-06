/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { connect } from 'react-redux'
import { setHeaderTypeAction } from '@Store/actions'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import { ArticlesManage } from '@Tools/articlesManage'
import useContentWidth from '@Hooks/useContentWidth'
import { RouteComponentProps } from 'react-router-dom'
import { Path, LocationDescriptorObject } from 'history'
import Content from '@Components/content'

interface IProps extends RouteComponentProps {
  store: StoreState
  setHeaderType: (headerType: string) => any
}

function CateoryList(props: IProps) {
  const contentWidth = useContentWidth()

  const categoryListCss = css`
    .category {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;

      .tag-name {
        font-size: 1.5rem;
        cursor: pointer;
      }

      .count {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        background-color: #eee;
      }
    }
  `

  const articlesManage = ArticlesManage.getInstance()
  const tagsMap = articlesManage.getAllTags()

  function searchArticles(tag: string) {
    routeTo('/?category=' + tag)
  }

  function routeTo (route: Path | LocationDescriptorObject) {
    if (typeof route === 'string') {
      props.history.push(route)
    }
  }
  
  return (
    <Content>
      <div css={categoryListCss}>
        {Object.keys(tagsMap).map(tag => (
          <div className="category" key={tag}>
            <span className="tag-name" onClick={() => searchArticles(tag)}>{tag}</span>
            <span className="count">{tagsMap[tag].count}</span>
          </div>
        ))}
      </div>
    </Content>
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