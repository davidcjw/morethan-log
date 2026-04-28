/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled"
import { CONFIG } from "site.config"
import React from "react"

type SponsorPlacement = "sidebar" | "article" | "feed"

type Sponsor = {
  id: string
  title: string
  description: string
  href: string
  image?: string
  label?: string
  cta?: string
  placements?: SponsorPlacement[]
  startsAt?: string
  endsAt?: string
}

type AdsConfig = {
  enabled?: boolean
  sponsors?: Sponsor[]
}

type Props = {
  placement: SponsorPlacement
  className?: string
}

const adsConfig = CONFIG.ads as AdsConfig | undefined

function isSponsorActive(sponsor: Sponsor) {
  const now = new Date()
  const startsAt = sponsor.startsAt ? new Date(sponsor.startsAt) : null
  const endsAt = sponsor.endsAt ? new Date(sponsor.endsAt) : null

  if (startsAt && startsAt > now) return false
  if (endsAt && endsAt < now) return false
  return true
}

const SponsorSlot: React.FC<Props> = ({ placement, className }) => {
  if (!adsConfig?.enabled) return null

  const sponsor = adsConfig.sponsors?.find((item) => {
    const placements = item.placements || ["sidebar"]
    return placements.includes(placement) && isSponsorActive(item)
  })

  if (!sponsor) return null

  return (
    <StyledWrapper className={className} data-placement={placement}>
      <a
        href={sponsor.href}
        target="_blank"
        rel="sponsored noopener noreferrer"
      >
        {sponsor.image && (
          <div className="media">
            <img src={sponsor.image} alt="" />
          </div>
        )}
        <div className="label">{sponsor.label || "Advertisement"}</div>
        <h3>{sponsor.title}</h3>
        <p>{sponsor.description}</p>
        <span className="cta">{sponsor.cta || "Visit sponsor"}</span>
      </a>
    </StyledWrapper>
  )
}

export default SponsorSlot

const StyledWrapper = styled.aside`
  a {
    display: block;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    color: ${({ theme }) => theme.colors.gray12};
  }

  .media {
    overflow: hidden;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
    background-color: ${({ theme }) => theme.colors.gray3};
    aspect-ratio: 16 / 9;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
    display: block;
    padding: 0.75rem 1rem 1rem;
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 700;
  }

  &[data-placement="article"] {
    margin: 2rem 0;
  }
`
