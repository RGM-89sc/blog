/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import Nav from '@Components/nav'
import useContentWidth from '@Hooks/useContentWidth'

interface IProps {
  store: StoreState;
  onSearch: (keyword: string) => any
}

function Header (props: IProps) {
  const contentWidth = useContentWidth()

  const headerCss = {
    base: css`
      position: relative;
      width: 100%;
      background-color: ${props.store.theme.common.bg};
      overflow: hidden;
  
      .main {
        margin: ${50  * ((150 - parseInt(contentWidth)) / 100)}px 0;
        padding: 1.5rem 0;
        width: 100%;
        text-align: center;
        z-index: 1;
      }
    }
    `,
    blogName: css`
      display: block;
      margin-bottom: 1.5rem;
      font-size: ${4.5 * ((150 - parseInt(contentWidth)) / 100)}rem;
      font-weight: bold;
      text-indent: 0.11ch;
      letter-spacing: 0.1ch;
      color: #a1afbd;
    `,
    intro: css`
      color: #909399;
    `,
    articleDetail: {
      title: css`
        display: block;
        margin-bottom: 1.5rem;
        font-size: 2rem;
        font-weight: bold;
        text-indent: 0.11ch;
        letter-spacing: 0.1ch;
        color: #a1afbd;
      `,
      meta: css`
        text-align: center;
  
        .time {
          color: #909399;
        }
  
        .tags {
          padding: 20px 0;
    
          .tag {
            display: inline-block;
            margin-right: 10px;
            padding: 5px 15px;
            color: ${props.store.theme.home.tagText};
            background-color: ${props.store.theme.home.tagBg};
            border-radius: 5px;
          }
        }
      `,
    }
  }

  function onSearchWordChange() {
    let timer: number | null = null
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (timer) {
        window.clearTimeout(timer)
      }
      timer = window.setTimeout(() => {
        props.onSearch(event.target.value)
      }, 500)
    }
  }

  return (
    <div id="header" css={headerCss.base}>
      <Nav></Nav>
      <div className="main">
        {props.store.headerType === 'default' && 
          <div>
            <span css={headerCss.blogName}>RGM's blog</span>
            <span css={headerCss.intro}>Pick up your sword and try again.</span>
            {/* <input type="text" onChange={onSearchWordChange()} /> */}
          </div>
        }
        {props.store.headerType === 'article-detail' &&
          <div>
            <span css={headerCss.articleDetail.title}>{props.store.currentArticle?.title}</span>
            <div css={headerCss.articleDetail.meta}>
              <span className="time">{props.store.currentArticle?.meta.time}</span>
              <div className="tags">
                {props.store.currentArticle?.meta?.tags && props.store.currentArticle?.meta?.tags.map((tag: string, index: number) => (
                  <span className="tag" key={index}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
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
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Header))