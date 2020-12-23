/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useEffect } from 'react'
import PostCard from '@Components/post-card'
import { connect } from 'react-redux'
import { setCurrentTabAction, setHeaderTypeAction } from '@Store/actions'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import { ArticleObj } from '@Types/article'
import { RouteComponentProps } from 'react-router-dom'
import { Path, LocationDescriptorObject } from 'history'
import { ArticlesManage } from '@Tools/articlesManage'
import useContentWidth from '@Hooks/useContentWidth'
import Content from '@Components/content'

interface IProps extends RouteComponentProps {
  store: StoreState;
  setHeaderType: (headerType: string) => any;
  setCurrentTab: (currentTab: string) => any;
}

const boxCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
`

function HomePage (props: IProps) {
  useEffect(() => {
    // 更新标题等信息
    if (props.store.headerType !== 'default') {
      props.setHeaderType('default')
    }

    if (props.store.currentTab !== '') {
      props.setCurrentTab('')
    }
  }, [])

  const contentWidth = useContentWidth()

  const postListStyle = css`
    
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

  const _posts = category ? articlesManage.getArticlesByCategory(category) : articlesManage.orderByBirthTimeDesc()

  const colors = [
    '#fcecdf',
    '#f7f5f6',
    '#f3e1fb',
    '#b0c1ef',
    '#ecdac2',
    '#ceb8aa',
    '#ece9da',
    '#bab1dc',
    '#d9cdf5',
    '#d3e6ec',
    '#ecf0fc',
    '#594c3b',
    '#c1f5ff',
    '#fea5bb',
    '#aa8479',
    '#d4b6ab',
    '#b28ba6',
    '#797993',
    '#5fb4dd',
    '#f7ae83',
    '#b3b9c5',
    '#e8e7ec',
    '#e4ecef',
    '#bedae5',
    '#b00515',
    '#bbcfd0',
    '#fd1a38',
    '#e8cce2',
    '#f8d0d8',
    '#fad5c2',
    '#e9cec3',
    '#e7a0a4',
    '#cbc0c8',
    '#FAEBD7',
    '#DAA520',
    '#2F4F4F',
    '#98FB98',
    '#7B68EE',
    '#00CED1',
  ]

  function routeTo (route: Path | LocationDescriptorObject) {
    if (typeof route === 'string') {
      props.history.push(route)
    }
  }

  return (
    <Content>
      <div css={postListStyle}>
        {/* <div>
        {colors.map(color => {
           return (
             <div css={boxCss} style={{backgroundColor: color}} key={color}>{color}</div>
           )
        })}
        </div> */}
        
        {_posts.map((post: ArticleObj) => (
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
  mapDispatchToProps
)(React.memo(HomePage))