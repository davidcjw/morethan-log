import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <span className="mark">D</span>
      <span className="text">
        <span className="primary">David&apos;s Smart Home Notes</span>
        <span className="secondary">Singapore HDB guides</span>
      </span>
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  min-width: 0;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.gray12};

  .mark {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid ${({ theme }) => theme.colors.gray7};
    border-radius: 0.5rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    color: ${({ theme }) => theme.colors.blue11};
    font-weight: 800;
    line-height: 1;
  }

  .text {
    display: grid;
    min-width: 0;
  }

  .primary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.9375rem;
    line-height: 1.2rem;
    font-weight: 800;
    letter-spacing: 0;
  }

  .secondary {
    display: none;
    color: ${({ theme }) => theme.colors.gray10};
    font-size: 0.75rem;
    line-height: 1rem;
  }

  :hover .primary {
    color: ${({ theme }) => theme.colors.blue11};
  }

  @media (min-width: 768px) {
    .secondary {
      display: block;
    }
  }
`
