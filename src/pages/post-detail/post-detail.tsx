/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { StoreState } from '@Types/storeState'
import { ArticleObj } from '@Types/article'
import { RouteComponentProps } from 'react-router-dom'
import { ArticlesManage } from '@Tools/articlesManage'
import { connect } from 'react-redux'
import { setCurrentArticleAction, setHeaderTypeAction } from '@Store/actions'
import { Dispatch } from 'redux'
import { CurrentArticleInfo } from '@Types/article'
import Content from '@Components/content'
import useContentWidth from '@Hooks/useContentWidth'
import hljs from 'highlight.js'
import getCss from './post-detail-css'
import 'highlight.js/styles/atom-one-dark.css'

interface IProps extends RouteComponentProps {
  store: StoreState
  setCurrentArticle: (currentArticle: CurrentArticleInfo) => any,
  setHeaderType: (headerType: string) => any
}

interface IState {
  detail: ArticleObj
}

function PostDetail(props: IProps) {
  window.scrollTo({ top: 0, left: 0 })

  const contentWidth = useContentWidth()

  const [postDetail, setPostDetail] = useState<ArticleObj>({
    content: {},
    name: '',
    stat: {}
  })

  function highlightBlock() {
    setTimeout(() => {
      document.querySelectorAll('.post-detail > .content pre > code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    })
  }

  function getPostDetail() {
    const routeParams: any = props.match.params
    const detail = ArticlesManage.getInstance().getArticleById(routeParams.id)
    setPostDetail(detail)
    console.log(detail)
    props.setHeaderType('article-detail')
    props.setCurrentArticle({
      title: detail.content.meta?.title || detail.name,
      meta: {
        time: detail.content.meta?.time || detail.stat?.birthtime?.replace(/T.+$/, ''),
        tags: detail.content.meta?.tags || []
      }
    })
    highlightBlock()
  }

  useEffect(() => {
    getPostDetail()
  }, [])

  const cssParams = { 
    contentWidth, 
    headerTitleColor: props.store.theme.postDetail.headerTitle, 
    codeBg: props.store.theme.postDetail.codeBg 
  }

  return (
    <Content>
      <div className="post-detail" css={css`${getCss(cssParams)}`}>
        <div className="content" dangerouslySetInnerHTML={{ __html: postDetail.content?.html || '' }}></div>
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
    setCurrentArticle: (value: CurrentArticleInfo) => (dispatch(setCurrentArticleAction(value))),
    setHeaderType: (headerType: string) => dispatch(setHeaderTypeAction(headerType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PostDetail))