/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import useContentWidth from '@Hooks/useContentWidth'

interface IProps {
  store: StoreState;
  children?: React.ReactChild
}

function Content (props: IProps) {
  const contentWidth = useContentWidth()

  const contentBoxStyle = css`
    width: 100%;
    height: 100%;
    color: ${props.store.theme.common.text};
    background-color: ${props.store.theme.common.bg};
    min-height: calc(100vh - 450px - 15px);
  `

  const contentStyle = css`
    box-sizing: border-box;
    margin: 0 auto;
    padding: 1rem 1.5rem 100px;
    width: ${contentWidth};
    height: 100%;
  }`

  return (
    <div css={contentBoxStyle}>
      <div css={contentStyle}>
        {props.children}
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
)(React.memo(Content))