import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"

type Props = {}

const ProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <div className="title">
        <Emoji>💻</Emoji> Profile
      </div>
      <div className="content">
        <div className="top">
          <Image src={CONFIG.profile.image} fill alt="" />
        </div>
        <div className="mid">
          <div className="name">{CONFIG.profile.name}</div>
          <div className="role">{CONFIG.profile.role}</div>
          <div className="bio">{CONFIG.profile.bio}</div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  > .title {
    margin-bottom: 0.625rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 800;
  }
  > .content {
    margin-bottom: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    width: 100%;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray3};
    @media (min-width: 768px) {
      padding: 1rem;
    }
    @media (min-width: 1024px) {
      padding: 1rem;
    }
    .top {
      position: relative;
      width: 100%;
      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }
    .mid {
      display: flex;
      padding: 0.5rem;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .name {
        font-size: 1.125rem;
        line-height: 1.5rem;
        font-weight: 800;
      }
      .role {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: ${({ theme }) => theme.colors.gray11};
      }
      .bio {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: ${({ theme }) => theme.colors.gray11};
      }
    }
  }
`
