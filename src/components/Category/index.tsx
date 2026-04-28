import { useRouter } from "next/router"
import React from "react"
import { COLOR_SET } from "./constants"
import styled from "@emotion/styled"

export const getColorClassByName = (name: string): string => {
  try {
    let sum = 0
    name.split("").forEach((alphabet) => (sum = sum + alphabet.charCodeAt(0)))
    const colorKey = sum
      .toString(16)
      ?.[sum.toString(16).length - 1].toUpperCase()
    return COLOR_SET[colorKey]
  } catch {
    return COLOR_SET[0]
  }
}

type Props = {
  children: string
  readOnly?: boolean
}

const Category: React.FC<Props> = ({ readOnly = false, children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    if (readOnly) return
    router.push(`/?category=${value}`)
  }
  return (
    <StyledWrapper
      onClick={() => handleClick(children)}
      data-read-only={readOnly}
    >
      {children}
    </StyledWrapper>
  )
}

export default Category

const StyledWrapper = styled.div`
  width: fit-content;
  max-width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.blue6};
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 800;
  cursor: pointer;
  overflow-wrap: anywhere;

  &[data-read-only="true"] {
    cursor: default;
  }
`
