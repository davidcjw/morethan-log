import React from "react"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
type Props = {}

const PageDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null
  return (
    <StyledWrapper>
      <NotionRenderer recordMap={data.recordMap} />
    </StyledWrapper>
  )
}

export default PageDetail

const StyledWrapper = styled.div`
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 0.5rem;
  max-width: 56rem;
  padding: 1rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray3};

  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`
