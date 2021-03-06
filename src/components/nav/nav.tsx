/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import { Link } from 'react-router-dom'
import useContentWidth from '@Hooks/useContentWidth'
import { setCurrentTabAction, setIsShowSettingAction } from '@Store/actions'
import SettingPopup from '@Components/setting-popup'

interface IProps {
  store: StoreState;
  setCurrentTab: (currentTab: string) => any;
  setIsShowSetting: (isShowSetting: boolean) => any;
}

function Nav(props: IProps) {
  useEffect(() => {
    const matchResult = location.hash.match(/^#\/([^/]+)/)
    let currentTabShouldBe = ''
    if (matchResult) {
      currentTabShouldBe = matchResult[1]
    }
    props.setCurrentTab(currentTabShouldBe)
  }, [])
  
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
        background-color: ${props.store.theme.navItem.bg};
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
      handler: props.setCurrentTab,
    },
    {
      id: 'category',
      text: '分类',
      handler: props.setCurrentTab,
    },
    {
      id: 'project',
      text: '项目',
      handler: props.setCurrentTab,
    },
    {
      id: 'proving-ground',
      text: '试验场',
      handler: props.setCurrentTab,
    },
    {
      id: 'setting',
      text: '设置',
      handler: () => {
        props.setCurrentTab('setting')
        props.setIsShowSetting(true)
      },
    },
  ]

  function stopImmediatePropagation(event: React.MouseEvent) {
    event.nativeEvent.stopImmediatePropagation()
  }

  return (
    <div id='nav' css={navCss} onClick={stopImmediatePropagation}>
      {navList.map((nav) => (
        <div
          className={`nav-item ${
            props.store.currentTab === nav.id ? 'nav-item-active' : ''
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

      <SettingPopup />
    </div>
  )
}

function mapStateToProps(state: any) {
  return {
    store: state,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setCurrentTab: (currentTab: string) => dispatch(setCurrentTabAction(currentTab)),
    setIsShowSetting: (isShowSetting: boolean) => dispatch(setIsShowSettingAction(isShowSetting))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Nav))
