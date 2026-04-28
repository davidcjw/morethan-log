import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {}

const Footer: React.FC<Props> = () => {
  const router = useRouter()
  return (
    <StyledWrapper>
      <a onClick={() => router.push("/")}>← Back</a>
      <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑ Top
      </a>
    </StyledWrapper>
  )
}

export default Footer

const StyledWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.gray6};
  padding-top: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray10};

  a {
    border-radius: 0.5rem;
    padding: 0.5rem 0;
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`
