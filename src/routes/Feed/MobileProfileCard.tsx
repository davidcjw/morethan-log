import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"

type Props = {
  className?: string
}

const MobileProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <div className="top">About the guide</div>
      <div className="mid">
        <div className="wrapper">
          <Image
            src={CONFIG.profile.image}
            width={56}
            height={56}
            css={{ position: "relative" }}
            alt="profile_image"
          />
          <div className="wrapper">
            <div className="top">{CONFIG.profile.name}</div>
            <div className="mid">{CONFIG.profile.role}</div>
            <div className="btm">{CONFIG.profile.bio}</div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default MobileProfileCard

const StyledWrapper = styled.div`
  display: block;
  margin: 1rem 0 1.5rem;

  @media (min-width: 1024px) {
    display: none;
  }

  > .top {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 800;
  }

  > .mid {
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    padding: 0.75rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray3};

    > .wrapper {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      min-width: 0;

      img {
        flex: 0 0 auto;
      }

      > .wrapper {
        height: fit-content;
        min-width: 0;

        > .top {
          font-size: 1rem;
          line-height: 1.375rem;
          font-weight: 700;
        }

        > .mid {
          margin-bottom: 0.25rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray11};
        }

        > .btm {
          color: ${({ theme }) => theme.colors.gray11};
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
      }
    }
  }
`
