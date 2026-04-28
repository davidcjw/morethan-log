import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type TOrder = "asc" | "desc"

type Props = {}

const OrderButtons: React.FC<Props> = () => {
  const router = useRouter()

  const currentOrder = `${router.query.order || ``}` || ("desc" as TOrder)

  const handleClickOrderBy = (value: TOrder) => {
    router.push({
      query: {
        ...router.query,
        order: value,
      },
    })
  }
  return (
    <StyledWrapper>
      <a
        data-active={currentOrder === "desc"}
        onClick={() => handleClickOrderBy("desc")}
      >
        Desc
      </a>
      <a
        data-active={currentOrder === "asc"}
        onClick={() => handleClickOrderBy("asc")}
      >
        Asc
      </a>
    </StyledWrapper>
  )
}

export default OrderButtons

const StyledWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.gray6};
  border-radius: 0.5rem;
  padding: 0.125rem;
  background-color: ${({ theme }) => theme.colors.gray3};

  a {
    border-radius: 0.375rem;
    padding: 0.375rem 0.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray10};
    font-size: 0.8125rem;
    line-height: 1.125rem;
    font-weight: 700;

    &[data-active="true"] {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "white" : theme.colors.gray5};
      box-shadow: ${({ theme }) =>
        theme.scheme === "light" ? "0 1px 2px rgba(0, 0, 0, 0.06)" : "none"};
    }
  }
`
