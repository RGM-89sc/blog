/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { StoreState } from '@Types/storeState'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface IProps {
  store: StoreState
}

function Footer (props: IProps) {
  const footerStyle = css`
    position: absolute;
    bottom: 0; 
    height: 15px;
    width: 100%;
    background-color: ${props.store.theme.footer.bg};
  `

  return (
    <div css={footerStyle}></div>
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
)(Footer)