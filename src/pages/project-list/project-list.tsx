/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { connect } from 'react-redux'
import { setHeaderTypeAction } from '@Store/actions'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'
import useContentWidth from '@Hooks/useContentWidth'
import Content from '@Components/content'

interface IProps {
  store: StoreState
  setHeaderType: (headerType: string) => any
}

function ProjectList(props: IProps) {
  const contentWidth = useContentWidth()

  const projectListCss = css`
    
  `

  return (
    <Content>
      <div css={projectListCss}>
        项目
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
    setHeaderType: (headerType: string) => dispatch(setHeaderTypeAction(headerType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProjectList))