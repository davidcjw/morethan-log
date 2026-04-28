import styled from "@emotion/styled"
import { CONFIG } from "site.config"
import { FiMessageCircle } from "react-icons/fi"
import React from "react"

type Props = {
  compact?: boolean
  className?: string
}

const commentsEnabled = CONFIG.cusdis.enable || CONFIG.utterances.enable

const CommentCTA: React.FC<Props> = ({ compact = false, className }) => {
  if (!commentsEnabled) return null

  return (
    <StyledWrapper
      href="#comments"
      data-compact={compact}
      className={className}
    >
      <FiMessageCircle className="icon" aria-hidden="true" />
      <span>Comments</span>
    </StyledWrapper>
  )
}

export default CommentCTA

const StyledWrapper = styled.a`
  display: inline-flex;
  gap: 0.375rem;
  align-items: center;
  width: fit-content;
  color: ${({ theme }) => theme.colors.gray10};
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;

  &[data-compact="true"] {
    font-size: 0.8125rem;
    line-height: 1.125rem;
  }

  :hover {
    color: ${({ theme }) => theme.colors.gray12};
  }

  .icon {
    flex: 0 0 auto;
  }
`
