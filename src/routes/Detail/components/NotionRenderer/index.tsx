import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(() =>
  import("react-notion-x").then((m) => m.NotionRenderer)
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-c.js"),
      import("prismjs/components/prism-cpp.js"),
      import("prismjs/components/prism-csharp.js"),
      import("prismjs/components/prism-docker.js"),
      import("prismjs/components/prism-java.js"),
      import("prismjs/components/prism-js-templates.js"),
      import("prismjs/components/prism-coffeescript.js"),
      import("prismjs/components/prism-diff.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-go.js"),
      import("prismjs/components/prism-graphql.js"),
      import("prismjs/components/prism-handlebars.js"),
      import("prismjs/components/prism-less.js"),
      import("prismjs/components/prism-makefile.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-objectivec.js"),
      import("prismjs/components/prism-ocaml.js"),
      import("prismjs/components/prism-python.js"),
      import("prismjs/components/prism-reason.js"),
      import("prismjs/components/prism-rust.js"),
      import("prismjs/components/prism-sass.js"),
      import("prismjs/components/prism-scss.js"),
      import("prismjs/components/prism-solidity.js"),
      import("prismjs/components/prism-sql.js"),
      import("prismjs/components/prism-stylus.js"),
      import("prismjs/components/prism-swift.js"),
      import("prismjs/components/prism-wasm.js"),
      import("prismjs/components/prism-yaml.js"),
    ])
    return m.Code
  })
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  width: 100%;
  min-width: 0;
  color: ${({ theme }) => theme.colors.gray12};

  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }

  .notion,
  .notion-page {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 0 !important;
    color: inherit;
    font-family: inherit;
  }

  .notion * {
    max-width: 100%;
  }

  .notion-page-content {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 0 !important;
  }

  .notion-text,
  .notion-list,
  .notion-quote,
  .notion-callout,
  .notion-table,
  .notion-code,
  .notion-bookmark,
  .notion-asset-wrapper,
  .notion-row {
    max-width: 100%;
    min-width: 0;
  }

  .notion-text {
    margin: 0.8rem 0;
    color: ${({ theme }) => theme.colors.gray12};
    font-size: 1rem;
    line-height: 1.8rem;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .notion-h,
  .notion-h1,
  .notion-h2,
  .notion-h3 {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.gray12};
    font-weight: 850;
    letter-spacing: 0;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .notion-h1 {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }

  .notion-h2 {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .notion-h3 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .notion-hash-link {
    display: none;
  }

  .notion-link {
    color: ${({ theme }) => theme.colors.blue11};
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.blue7};
    text-underline-offset: 0.18em;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .notion-semantic-string {
    max-width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .notion-list {
    margin: 0.35rem 0;
    padding-left: 1.35rem;
    color: ${({ theme }) => theme.colors.gray12};
    line-height: 1.75rem;
  }

  .notion-list li,
  .notion-list-disc,
  .notion-list-numbered {
    overflow-wrap: anywhere;
  }

  .notion-hr {
    margin: 1.75rem 0;
    border-color: ${({ theme }) => theme.colors.gray6};
  }

  .notion-callout {
    margin: 1.25rem 0;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.gray2};
    overflow: hidden;
  }

  .notion-callout-text {
    min-width: 0;
    max-width: 100%;
  }

  .notion-quote {
    margin: 1.25rem 0;
    border-left: 3px solid ${({ theme }) => theme.colors.blue8};
    padding: 0.25rem 0 0.25rem 1rem;
    color: ${({ theme }) => theme.colors.gray11};
  }

  .notion-code {
    overflow-x: auto;
    border-radius: 0.5rem;
    max-width: 100%;
  }

  .notion-code code,
  code {
    overflow-wrap: anywhere;
  }

  .notion-table,
  .notion-simple-table {
    display: block;
    overflow-x: auto;
    max-width: 100%;
  }

  .notion-bookmark {
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
  }

  .notion-asset-wrapper {
    overflow: hidden;
    border-radius: 0.5rem;
  }

  @media (max-width: 480px) {
    .notion-text {
      font-size: 0.96875rem;
      line-height: 1.7rem;
    }

    .notion-h1 {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    .notion-h2 {
      font-size: 1.3125rem;
      line-height: 1.85rem;
    }

    .notion-h3 {
      font-size: 1.125rem;
      line-height: 1.625rem;
    }
  }
`
