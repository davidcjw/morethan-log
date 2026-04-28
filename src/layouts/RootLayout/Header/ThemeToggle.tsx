import styled from "@emotion/styled"
import React from "react"
import { Emoji } from "src/components/Emoji"
import useScheme from "src/hooks/useScheme"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme()

  const handleClick = () => {
    setScheme(scheme === "light" ? "dark" : "light")
  }

  return (
    <StyledWrapper
      type="button"
      onClick={handleClick}
      aria-label={`Switch to ${scheme === "light" ? "dark" : "light"} theme`}
    >
      <Emoji>{scheme === "light" ? "☀️" : "🌙"}</Emoji>
    </StyledWrapper>
  )
}

export default ThemeToggle

const StyledWrapper = styled.button`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 0.5rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`
