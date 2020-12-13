/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { ArticleObj } from '@Types/article'
import { Path, LocationDescriptorObject } from 'history'
import { connect } from 'react-redux'
import { setHeaderTypeAction } from '@Store/actions'
import { Dispatch } from 'redux'
import { StoreState } from '@Types/storeState'


interface IProps {
  store: StoreState,
  detail: ArticleObj,
  routeTo: (route: Path | LocationDescriptorObject) => void,
  setHeaderType: (headerType: string) => any
}

interface IState {}

const styles = {
  postCard: css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
    padding: 10px 20px;
    width: 100%;
    min-height: 120px;
    border-left: 4px solid transparent;
    transition: all .5s;
  
    &:hover {
      border-color: #dae0e2;
    }
  `,
  title: css`
    display: block;
    padding: 0 0 10px;
    font-size: 1.5rem;
    cursor: pointer;
  `,
  date: css`
    color: #606266;
  `,
  tags: css`
    padding: 10px 0 0;
  `,
  tag: css`
    display: inline-block;
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #eee;
    border-radius: 5px;
  `
}

class PostCard extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    
    this.state = {
      
    }

    this.routeTo = this.routeTo.bind(this)
    this.toDetail = this.toDetail.bind(this)
  }

  routeTo (path: Path) {
    this.props.routeTo(path)
  }

  toDetail () {
    this.props.setHeaderType('article-detail')
    this.routeTo(`/post/${this.props.detail.id}`)
  }

  render() {
    return (
      <div css={styles.postCard}>
        <span css={styles.title} 
              onClick={this.toDetail}
        >{this.props.detail.content.meta?.title || this.props.detail.name}</span>
        <span css={styles.date}>{this.props.detail.content.meta?.time || this.props.detail.stat.birthtime.replace(/T.+$/, '')}</span>
        <div css={styles.tags}>
          {this.props.detail.content.meta?.tags.map((tag: string, index: number) => (
            <span css={styles.tag} key={index}>{tag}</span>
          ))}
        </div>
      </div>
    )
  }
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
)(PostCard)