/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

const footerStyle = css`
  height: 15px;
  width: 100%;
  background-color: #bbcfd0;
`

interface IProps {

}

function Footer (props: IProps) {
  return (
    <div css={footerStyle}></div>
  )
}

export default Footer