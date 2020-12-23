interface Params {
  contentWidth: string;
  headerTitleColor: string;
}

export default function ({ contentWidth, headerTitleColor }: Params) {
  return `
    .pre-detail {
      .go-back {
        display: inline-block;
        padding: 0 10px 0 0;
        line-height: 20px;
        color: #8FCCFB;
        cursor: pointer;
      }
    }

    .header {
      .title {
        color: #303133;
      }

      .date {
        font-size: 1.05rem;
        color: #606266;
      }

      .tags {
        padding: 20px 0;

        .tag {
          display: inline-block;
          margin-right: 10px;
          padding: 5px 15px;
          background-color: #eee;
          border-radius: 5px;
        }
      }
    }

    .content {
      overflow: hidden;

      a {
        color: #4183C4;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        position: relative;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-weight: bold;
        line-height: 1.4;
        color: ${headerTitleColor};
        cursor: text;
      }

      h1:hover a.anchor,
      h2:hover a.anchor,
      h3:hover a.anchor,
      h4:hover a.anchor,
      h5:hover a.anchor,
      h6:hover a.anchor {
        text-decoration: none;
      }

      h1 tt,
      h1 code {
        font-size: inherit;
      }

      h2 tt,
      h2 code {
        font-size: inherit;
      }

      h3 tt,
      h3 code {
        font-size: inherit;
      }

      h4 tt,
      h4 code {
        font-size: inherit;
      }

      h5 tt,
      h5 code {
        font-size: inherit;
      }

      h6 tt,
      h6 code {
        font-size: inherit;
      }

      h1 {
        padding-bottom: .3em;
        font-size: 2.25em;
        line-height: 1.2;
        border-bottom: 1px solid #dedede;
      }

      h2 {
        margin-top: 1.2em;
        padding-bottom: .3em;
        font-size: 1.75em;
        line-height: 1.225;
        border-bottom: 1px solid #dedede;
      }

      h3 {
        font-size: 1.5em;
        line-height: 1.43;
      }

      h4 {
        font-size: 1.25em;
      }

      h5 {
        font-size: 1em;
      }

      h6 {
        font-size: 1em;
        color: #777;
      }

      p,
      blockquote,
      ul,
      ol,
      dl,
      table {
        margin: 0.8em 0;
      }

      li>ol,
      li>ul {
        margin: 0 0;
      }

      hr {
        height: 4px;
        padding: 0;
        margin: 16px 0;
        background-color: #e7e7e7;
        border: 0 none;
        overflow: hidden;
        box-sizing: content-box;
        border-bottom: 1px solid #ddd;
      }

      body>h2:first-of-type {
        margin-top: 0;
        padding-top: 0;
      }

      body>h1:first-of-type {
        margin-top: 0;
        padding-top: 0;
      }

      body>h1:first-of-type+h2 {
        margin-top: 0;
        padding-top: 0;
      }

      body>h3:first-of-type,
      body>h4:first-of-type,
      body>h5:first-of-type,
      body>h6:first-of-type {
        margin-top: 0;
        padding-top: 0;
      }

      a:first-of-type h1,
      a:first-of-type h2,
      a:first-of-type h3,
      a:first-of-type h4,
      a:first-of-type h5,
      a:first-of-type h6 {
        margin-top: 0;
        padding-top: 0;
      }

      h1 p,
      h2 p,
      h3 p,
      h4 p,
      h5 p,
      h6 p {
        margin-top: 0;
      }

      li p.first {
        display: inline-block;
      }

      ul,
      ol {
        padding-left: 30px;
      }

      ul:first-of-type,
      ol:first-of-type {
        margin-top: 0;
      }

      ul:last-child,
      ol:last-child {
        margin-bottom: 0;
      }

      blockquote {
        border-left: 4px solid #dddddd;
        padding: 0 15px;
        color: #777777;
      }

      blockquote blockquote {
        padding-right: 0;
      }

      table {
        padding: 0;
        word-break: initial;
      }

      table tr {
        border-top: 1px solid #cccccc;
        margin: 0;
        padding: 0;
      }

      table tr:nth-of-type(2n) {
        background-color: #f8f8f8;
      }

      table tr th {
        font-weight: bold;
        border: 1px solid #cccccc;
        text-align: left;
        margin: 0;
        padding: 6px 13px;
      }

      table tr td {
        border: 1px solid #cccccc;
        text-align: left;
        margin: 0;
        padding: 6px 13px;
      }

      table tr th:first-of-type,
      table tr td:first-of-type {
        margin-top: 0;
      }

      table tr th:last-child,
      table tr td:last-child {
        margin-bottom: 0;
      }

      pre>code {
        padding: 1em !important;
        line-height: 1.6rem;
        font-family: Consolas;
        border-radius: 5px;
      }

      p {
        line-height: 2.4rem;
        letter-spacing: 0.1ch;

        code {
          position: relative;
          top: -2px;
          display: inline-block;
          margin: 0 6px;
          padding: 5px 10px;
          line-height: 1rem;
          font-family: Consolas;
          color: #5e5e72;
          background-color: #e8e7ec;
          border-radius: 5px;
        }

        a {
          color: #41daa7;
        }
      }
    }`
}