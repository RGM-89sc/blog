/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import Nav from '@Components/nav'

interface IProps {
  store: StoreState
}

const headerCss = {
  base: css`
    position: relative;
    width: 100%;
    height: 450px;
    background-color: #f7f5f6;

    .main {
      position: absolute;
      margin: 50px 0;
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
    font-size: 4.5rem;
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
          background-color: #eee;
          border-radius: 5px;
        }
      }
    `,
  }
}

function Header (props: IProps) {
  return (
    <div id="header" css={headerCss.base}>
      <Nav></Nav>
      <div className="main">
        {props.store.headerType === 'default' && 
          <div>
            <span css={headerCss.blogName}>RGM's blog</span>
            <span css={headerCss.intro}>Pick up your sword and try again.</span>
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