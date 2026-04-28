import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    router.push(`/?tag=${value}`)
  }
  return (
    <StyledWrapper onClick={() => handleClick(children)}>
      {children}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray10};
  background-color: ${({ theme }) => theme.colors.gray3};
  cursor: pointer;
  overflow-wrap: anywhere;

  :hover {
    color: ${({ theme }) => theme.colors.gray12};
    border-color: ${({ theme }) => theme.colors.gray7};
  }
`
