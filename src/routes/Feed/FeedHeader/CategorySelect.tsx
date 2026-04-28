import useDropdown from "src/hooks/useDropdown"
import { useRouter } from "next/router"
import React from "react"
import { MdExpandMore } from "react-icons/md"
import { DEFAULT_CATEGORY } from "src/constants"
import styled from "@emotion/styled"
import { useCategoriesQuery } from "src/hooks/useCategoriesQuery"

type Props = {}

const CategorySelect: React.FC<Props> = () => {
  const router = useRouter()
  const data = useCategoriesQuery()
  const [dropdownRef, opened, handleOpen] = useDropdown()

  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY

  const handleOptionClick = (category: string) => {
    router.push({
      query: {
        ...router.query,
        category,
      },
    })
  }
  return (
    <StyledWrapper>
      <div ref={dropdownRef} className="wrapper" onClick={handleOpen}>
        <span>{currentCategory} Posts</span>
        <MdExpandMore aria-hidden="true" />
      </div>
      {opened && (
        <div className="content">
          {Object.keys(data).map((key, idx) => (
            <div
              className="item"
              key={idx}
              onClick={() => handleOptionClick(key)}
            >
              {`${key} (${data[key]})`}
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  )
}

export default CategorySelect

const StyledWrapper = styled.div`
  position: relative;
  min-width: 0;

  > .wrapper {
    display: flex;
    gap: 0.375rem;
    align-items: center;
    min-width: 0;
    border-radius: 0.5rem;
    padding: 0.25rem 0.375rem 0.25rem 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
    font-weight: 800;
    cursor: pointer;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :hover {
      color: ${({ theme }) => theme.colors.blue11};
    }
  }

  > .content {
    position: absolute;
    z-index: 40;
    top: calc(100% + 0.5rem);
    min-width: 14rem;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    padding: 0.375rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray3};
    color: ${({ theme }) => theme.colors.gray11};
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);

    > .item {
      padding: 0.5rem 0.625rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      white-space: nowrap;
      cursor: pointer;

      :hover {
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray4};
      }
    }
  }
`
