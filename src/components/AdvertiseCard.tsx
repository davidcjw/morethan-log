import styled from "@emotion/styled"
import Link from "next/link"
import { CONFIG } from "site.config"
import { FiArrowRight } from "react-icons/fi"
import React from "react"

type Props = {
  compact?: boolean
  className?: string
}

const AdvertiseCard: React.FC<Props> = ({ compact = false, className }) => {
  if (!CONFIG.ads?.enabled) return null

  return (
    <StyledWrapper className={className} data-compact={compact}>
      <Link href="/advertise">
        <div className="label">Advertisement</div>
        <h3>Advertise here</h3>
        <p>
          Reach readers researching smart home gear, HDB setups, and Home
          Assistant workflows.
        </p>
        <span className="cta">
          Sponsor a slot <FiArrowRight aria-hidden="true" />
        </span>
      </Link>
    </StyledWrapper>
  )
}

export default AdvertiseCard

const StyledWrapper = styled.aside`
  a {
    display: block;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? theme.colors.gray1 : theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray12};
  }

  .label {
    padding: 0.875rem 1rem 0;
    color: ${({ theme }) => theme.colors.gray10};
    font-size: 0.6875rem;
    line-height: 1rem;
    text-transform: uppercase;
  }

  h3 {
    padding: 0.25rem 1rem 0;
    font-size: 0.9375rem;
    line-height: 1.35rem;
    font-weight: 700;
  }

  p {
    padding: 0.5rem 1rem 0;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.8125rem;
    line-height: 1.35rem;
  }

  .cta {
    display: inline-flex;
    gap: 0.375rem;
    align-items: center;
    padding: 0.75rem 1rem 1rem;
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 700;
  }

  &[data-compact="true"] {
    margin: 1.25rem 0;
  }
`
