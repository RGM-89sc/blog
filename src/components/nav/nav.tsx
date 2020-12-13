/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import { Link } from 'react-router-dom'
import useContentWidth from '@Hooks/useContentWidth'

interface IProps {
  store: StoreState
}

function Nav(props: IProps) {
  const matchResult = location.hash.match(/^#\/([^/]+)/)
  let currentTabShouldBe = ''
  if (matchResult) {
    currentTabShouldBe = matchResult[1]
  }
  const [currentTab, setCurrentTab] = useState(currentTabShouldBe)

  const contentWidth = useContentWidth()

  const navCss = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 ${(100 - parseInt(contentWidth)) / 2}vw;
    width: 100%;

    .nav-item {
      display: flex;
      justify-content: center;
      flex: 1;

      &-active {
        background-color: #e8e7ec;
      }

      a {
        display: inline-block;
        padding: 10px 20px;
        color: #7fa2bb;
        text-decoration: none;

        &:link,
        &:visited,
        &:hover,
        &:active {
          color: #7fa2bb;
        }
      }

      span {
        display: inline-block;
        padding: 10px 20px;
        color: #7fa2bb;
        cursor: pointer;
      }
    }
  `

  const navList = [
    {
      id: '',
      text: '首页',
      handler: setCurrentTab,
    },
    {
      id: 'category',
      text: '分类',
      handler: setCurrentTab,
    },
    {
      id: 'project',
      text: '项目',
      handler: setCurrentTab,
    },
    {
      id: 'proving-ground',
      text: '试验场',
      handler: setCurrentTab,
    },
    {
      id: 'setting',
      text: '设置',
      handler: () => {
        setCurrentTab('setting')
      },
    },
  ];

  return (
    <div id='nav' css={navCss}>
      {navList.map((nav) => (
        <div
          className={`nav-item ${
            currentTab === nav.id ? 'nav-item-active' : ''
          }`}
          key={nav.id}
        >
          {nav.id === 'setting' && (
            <span onClick={(e) => nav.handler(nav.id)}>{nav.text}</span>
          )}
          {nav.id !== 'setting' && (
            <Link to={`/${nav.id}`} onClick={(e) => nav.handler(nav.id)}>
              {nav.text}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

function mapStateToProps(state: any) {
  return {
    store: state,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Nav))
