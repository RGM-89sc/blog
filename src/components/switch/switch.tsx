/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useRef } from 'react'
import { StoreState } from '@Types/storeState'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface IProps {
  store: StoreState;
  checked: boolean;
  onChange: (checked: boolean) => any;
  checkedColor?: string;
}

function Switch(props: IProps) {
  const checkedColor = props.checkedColor || '#06D6A0'

  const switchCss = css`
    display: inline-flex;
    vertical-align: top;

    input {
      display: none;
      width: 0;
      height: 0;
    }

    label {
      position: relative;
      width: 50px;
      height: 25px;
      background-color: #ddd;
      border-radius: 50px;
      cursor: pointer;
      transition: all .2s;

      span {
        position: absolute;
        top: 50%;
        left: 1px;
        width: 23px;
        height: 23px;
        background-color: #fff;
        border-radius: 23px;
        transform: translateY(-50%);
        transition: all .2s;
        box-shadow: 0 0 1px 0 rgba(10, 10, 10, 0.29);
      }
    }

    input:checked + label > span {
      left: calc(100% - 1px);
      transform: translate(-100%, -50%);
    }
  `

  const inputEl = useRef<HTMLInputElement>(null)

  function toggleChecked() {
    if (inputEl.current) {
      inputEl.current.checked = !inputEl.current.checked
      props.onChange(inputEl.current.checked)
    }
  }

  return (
    <div css={switchCss}>
      <input ref={inputEl} checked={props.checked} onChange={() => {}} type="checkbox"/>
      <label onClick={toggleChecked} style={{ backgroundColor: props.checked ? checkedColor : undefined }}>
        <span></span>
      </label>
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
    
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Switch))
