import styled from "@emotion/styled"
import Link from "next/link"
import { useRouter } from "next/router"

const NavBar: React.FC = () => {
  const router = useRouter()
  const links = [
    { id: 1, name: "Smart Home", to: "/smart-home-singapore", primary: true },
    { id: 2, name: "Advertise", to: "/advertise" },
    { id: 3, name: "About", to: "/about" },
  ]
  return (
    <StyledWrapper aria-label="Primary navigation">
      <ul>
        {links.map((link) => (
          <li key={link.id} data-secondary={!link.primary}>
            <Link href={link.to} data-active={router.asPath === link.to}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.nav`
  flex-shrink: 0;

  ul {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    margin: 0;

    li {
      display: block;

      &[data-secondary="true"] {
        display: none;

        @media (min-width: 680px) {
          display: block;
        }
      }
    }

    a {
      display: block;
      border-radius: 0.5rem;
      padding: 0.45rem 0.625rem;
      color: ${({ theme }) => theme.colors.gray11};
      font-size: 0.875rem;
      line-height: 1.15rem;
      font-weight: 650;
      white-space: nowrap;

      :hover {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray4};
      }

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.blue11};
        background-color: ${({ theme }) => theme.colors.blue4};
      }
    }
  }
`
