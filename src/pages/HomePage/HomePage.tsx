/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import PostCard from '@Components/post-card'
import { connect } from 'react-redux'
import { setCurrentTabAction, setHeaderTypeAction } from '@Store/actions'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import { ArticleObj } from '@Types/article'
import { RouteComponentProps } from 'react-router-dom'
import { Path, LocationDescriptorObject } from 'history'
import { ArticlesManage } from '@Tools/articlesManage'
import Content from '@Components/content'

interface IProps extends RouteComponentProps {
  store: StoreState;
  setHeaderType: (headerType: string) => any;
  setCurrentTab: (currentTab: string) => any;
}

interface HomePageRef {
  searchArticlesByKeyword: (keyword: string) => void
}

function HomePage (props: IProps, ref: React.Ref<HomePageRef> | undefined) {
  useImperativeHandle(ref, () => ({
    searchArticlesByKeyword: searchArticlesByKeyword
  }))

  useEffect(() => {
    // 更新标题等信息
    if (props.store.headerType !== 'default') {
      props.setHeaderType('default')
    }

    if (props.store.currentTab !== '') {
      props.setCurrentTab('')
    }
  }, [])

  const postListStyle = css`
    color: ${props.store.theme.home.text};
  }`

  const articlesManage = ArticlesManage.getInstance()

  const querys = props.location.search.substring(1).split('&')
  let category = ''
  querys.some(query => {
    const [key, value] = query.split('=')
    if (key === 'category') {
      category = value
      return true
    }
    return false
  })

  function getDefaultPosts() {
    return category ? articlesManage.getArticlesByCategory(category) : articlesManage.orderByBirthTimeDesc()
  }

  const [currentPosts, setCurrentPosts] = useState(getDefaultPosts())

  function routeTo (route: Path | LocationDescriptorObject) {
    if (typeof route === 'string') {
      props.history.push(route)
    }
  }

  function searchArticlesByKeyword (keyword: string) {
    if (keyword) {
      setCurrentPosts(articlesManage.getArticlesByKeyword(keyword))
    } else {
      setCurrentPosts(getDefaultPosts())
    }
  }

  return (
    <Content>
      <div css={postListStyle}>
        {currentPosts.map((post: ArticleObj) => (
          <PostCard key={post.id} detail={Object.assign({}, post)} routeTo={routeTo} />
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
    setHeaderType: (headerType: string) => dispatch(setHeaderTypeAction(headerType)),
    setCurrentTab: (currentTab: string) => dispatch(setCurrentTabAction(currentTab))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null, 
  { forwardRef: true }
)(forwardRef(HomePage))