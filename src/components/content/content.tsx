/** @jsx jsx */
import { css, jsx } from '@emotion/react'
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
    box-sizing: border-box;
    padding: 1rem 1rem 100px;
    width: 100%;
    color: ${props.store.theme.common.text};
    background-color: ${props.store.theme.common.bg};
  `

  const contentStyle = css`
    box-sizing: border-box;
    margin: 0 auto;
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