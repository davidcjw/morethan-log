import { Global as _Global, css, useTheme } from "@emotion/react"

import { ThemeProvider as _ThemeProvider } from "@emotion/react"
import { pretendard } from "src/assets"

export const Global = () => {
  const theme = useTheme()

  return (
    <_Global
      styles={css`
        html,
        body,
        #__next {
          min-height: 100%;
        }

        html {
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          color: ${theme.colors.gray12};
          background-color: ${theme.colors.gray2};
          font-family: ${pretendard.style.fontFamily};
          font-weight: ${pretendard.style.fontWeight};
          font-style: ${pretendard.style.fontStyle};
          line-height: 1.5;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        * {
          color-scheme: ${theme.scheme};
          box-sizing: border-box;
        }

        main,
        header,
        article,
        section,
        nav,
        aside,
        div {
          min-width: 0;
        }

        img,
        svg,
        video,
        canvas,
        iframe {
          max-width: 100%;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-weight: inherit;
          font-style: inherit;
          overflow-wrap: break-word;
        }

        a {
          all: unset;
          cursor: pointer;
          overflow-wrap: break-word;
        }

        p,
        li {
          overflow-wrap: break-word;
        }

        ul {
          padding: 0;
        }

        // init button
        button {
          all: unset;
          cursor: pointer;
          font-family: inherit;
        }

        // init input
        input {
          all: unset;
          box-sizing: border-box;
          font-family: inherit;
        }

        // init textarea
        textarea {
          border: none;
          background-color: transparent;
          font-family: inherit;
          padding: 0;
          outline: none;
          resize: none;
          color: inherit;
        }

        hr {
          width: 100%;
          border: none;
          margin: 0;
          border-top: 1px solid ${theme.colors.gray6};
        }

        ::selection {
          background-color: ${theme.colors.blue5};
        }

        :focus-visible {
          outline: 2px solid ${theme.colors.blue8};
          outline-offset: 3px;
        }
      `}
    />
  )
}
