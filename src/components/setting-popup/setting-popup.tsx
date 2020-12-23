/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import useContentWidth from '@Hooks/useContentWidth'
import { setCurrentTabAction, setIsShowSettingAction, setThemeAction } from '@Store/actions'
import Switch from '@Components/switch'
import { lightTheme, darkTheme } from '@Config/theme'

interface IProps {
  store: StoreState;
  setCurrentTab: (currentTab: string) => any;
  setIsShowSetting: (isShowSetting: boolean) => any;
  setTheme: (theme: any) => any;
}

function SettingPopup(props: IProps) {
  useEffect(() => {
    function handler() {
      console.log('点击')
      const matchResult = location.hash.match(/^#\/([^/]+)/)
      let currentTabShouldBe = ''
      if (matchResult) {
        currentTabShouldBe = matchResult[1]
      }
      props.setIsShowSetting(false)
      props.setCurrentTab(currentTabShouldBe)
    }

    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])
  
  const contentWidth = useContentWidth()

  const settingPopupCss = css`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px;
    width: 20vw;
    max-width: 600px;
    height: 100vh;
    color: ${props.store.theme.setting.label};
    background-color: ${props.store.theme.setting.bg};
    z-index: 2;
    overflow-x: hidden;
    overflow-y: auto;
  `

  const themeSettingCss = css`
    display: flex;
    align-items: center;

    span {
      margin-right: 10px;
    }
  `

  function stopImmediatePropagation(event: React.MouseEvent) {
    event.nativeEvent.stopImmediatePropagation()
  }

  function onSwicthChange(value: boolean) {
    if (value) {
      props.setTheme(darkTheme)
    } else {
      props.setTheme(lightTheme)
    }
  }

  return (
    <div id='setting-popup' css={settingPopupCss} onClick={stopImmediatePropagation}>
      <div css={themeSettingCss}>
        <span>关灯</span>
        <Switch checked={props.store.theme.name === 'dark'} checkedColor={props.store.theme.setting.checked} onChange={onSwicthChange} />
      </div>
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
    setIsShowSetting: (isShowSetting: boolean) => dispatch(setIsShowSettingAction(isShowSetting)),
    setTheme: (theme: any) => dispatch(setThemeAction(theme))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SettingPopup))
