import styled from "@emotion/styled"
import React, { InputHTMLAttributes } from "react"
import { FiSearch } from "react-icons/fi"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <div className="top">
        <FiSearch aria-hidden="true" /> Search guides
      </div>
      <input
        className="mid"
        type="text"
        aria-label="Search guides"
        placeholder="Search Matter, HDB, Wi-Fi, renovation..."
        {...props}
      />
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  > .top {
    display: flex;
    gap: 0.375rem;
    align-items: center;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.gray11};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 750;
  }

  > .mid {
    display: block;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    padding: 0.75rem 0.875rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? theme.colors.gray1 : theme.colors.gray2};
    color: ${({ theme }) => theme.colors.gray12};
    font-size: 0.9375rem;
    line-height: 1.375rem;

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray9};
    }

    :focus {
      border-color: ${({ theme }) => theme.colors.blue8};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.blue4};
    }
  }
`
