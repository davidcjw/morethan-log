import { CONFIG } from "site.config"
import React from "react"
import {
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineMail,
  AiFillLinkedin,
} from "react-icons/ai"
import styled from "@emotion/styled"

const ContactCard: React.FC = () => {
  return (
    <>
      <StyledTitle>💬 Contact</StyledTitle>
      <StyledWrapper>
        {CONFIG.profile.github && (
          <a
            href={`https://github.com/${CONFIG.profile.github}`}
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineGithub className="icon" />
            <div className="name">github</div>
          </a>
        )}
        {CONFIG.profile.instagram && (
          <a
            href={`https://www.instagram.com/${CONFIG.profile.instagram}`}
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineInstagram className="icon" />
            <div className="name">instagram</div>
          </a>
        )}
        {CONFIG.profile.email && (
          <a
            href={`mailto:${CONFIG.profile.email}`}
            rel="noreferrer"
            target="_blank"
            css={{ overflow: "hidden" }}
          >
            <AiOutlineMail className="icon" />
            <div className="name">email</div>
          </a>
        )}
        {CONFIG.profile.linkedin && (
          <a
            href={`https://www.linkedin.com/in/${CONFIG.profile.linkedin}`}
            rel="noreferrer"
            target="_blank"
          >
            <AiFillLinkedin className="icon" />
            <div className="name">linkedin</div>
          </a>
        )}
      </StyledWrapper>
    </>
  )
}

export default ContactCard

const StyledTitle = styled.div`
  margin-bottom: 0.625rem;
  color: ${({ theme }) => theme.colors.gray11};
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 800;
`
const StyledWrapper = styled.div`
  display: flex;
  padding: 0.25rem;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 0.5rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray3};
  a {
    display: flex;
    padding: 0.625rem;
    gap: 0.75rem;
    align-items: center;
    border-radius: 0.375rem;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;
    min-width: 0;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray4};
    }
    .icon {
      font-size: 1.5rem;
      line-height: 2rem;
    }
    .name {
      font-size: 0.875rem;
      line-height: 1.25rem;
      min-width: 0;
    }
  }
`
