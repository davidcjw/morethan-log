import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import { zIndexes } from "src/styles/zIndexes"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  return (
    <StyledWrapper>
      <div data-full-width={fullWidth} className="container">
        <Logo />
        <div className="nav">
          <ThemeToggle />
          <NavBar />
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Header

const StyledWrapper = styled.div`
  z-index: ${zIndexes.header};
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
  background-color: ${({ theme }) =>
    theme.scheme === "light"
      ? "rgba(249, 249, 249, 0.88)"
      : "rgba(18, 18, 18, 0.86)"};
  backdrop-filter: blur(16px);

  .container {
    display: flex;
    gap: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1120px;
    height: 3.75rem;
    margin: 0 auto;
    min-width: 0;

    &[data-full-width="true"] {
      @media (min-width: 768px) {
        padding-left: 6rem;
        padding-right: 6rem;
      }
    }

    .nav {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex: 0 0 auto;
    }
  }
`
