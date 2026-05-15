import { CONFIG } from "site.config"
import React from "react"
import {
  AiOutlineCalculator,
  AiOutlineFilePdf,
  AiOutlineLink,
} from "react-icons/ai"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"

const SERVICE_ICONS = {
  calculator: AiOutlineCalculator,
  link: AiOutlineLink,
  pdf: AiOutlineFilePdf,
}

const ServiceCard: React.FC = () => {
  if (!CONFIG.projects) return null
  return (
    <>
      <StyledTitle>
        <Emoji>🌟</Emoji> Service
      </StyledTitle>
      <StyledWrapper>
        {CONFIG.projects.map((project, idx) => {
          const Icon =
            SERVICE_ICONS[project.icon as keyof typeof SERVICE_ICONS] ||
            AiOutlineLink

          return (
            <a
              key={idx}
              href={`${project.href}`}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="icon" />
              <div className="content">
                <div className="name">{project.name}</div>
                {project.description && (
                  <div className="description">{project.description}</div>
                )}
              </div>
            </a>
          )
        })}
      </StyledWrapper>
    </>
  )
}

export default ServiceCard

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
  margin-bottom: 1rem;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 0.5rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray3};
  > a {
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
      flex: 0 0 auto;
    }
    .content {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 0.125rem;
    }
    .name,
    .description {
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .name {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
    }
    .description {
      color: ${({ theme }) => theme.colors.gray10};
      font-size: 0.75rem;
      line-height: 1rem;
    }
  }
`
