/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import { setHeaderTypeAction } from '@Store/actions'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import useContentWidth from '@Hooks/useContentWidth'

interface IProps {
  store: StoreState
  setHeaderType: (headerType: string) => any
}

function ProvingGround(props: IProps) {
  const contentWidth = useContentWidth()

  const provingGroundCss = css`
    box-sizing: border-box;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    width: ${contentWidth};
  `

  return (
    <div css={provingGroundCss}>
      试验场
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
    setHeaderType: (headerType: string) => dispatch(setHeaderTypeAction(headerType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProvingGround))