import { TPost } from "src/types"
import { CONFIG } from "site.config"
import dynamic from "next/dynamic"
import styled from "@emotion/styled"

const UtterancesComponent = dynamic(
  () => {
    return import("./Utterances")
  },
  { ssr: false }
)
const CusdisComponent = dynamic(
  () => {
    return import("./Cusdis")
  },
  { ssr: false }
)

type Props = {
  data: TPost
}

const CommentBox: React.FC<Props> = ({ data }) => {
  const commentsEnabled = CONFIG.utterances.enable || CONFIG.cusdis.enable

  if (!commentsEnabled) return null

  return (
    <StyledWrapper id="comments">
      <div className="heading">
        <span>Conversation</span>
        <h2>Comments</h2>
      </div>
      {CONFIG.utterances.enable && <UtterancesComponent issueTerm={data.id} />}
      {CONFIG.cusdis.enable && (
        <CusdisComponent id={data.id} slug={data.slug} title={data.title} />
      )}
    </StyledWrapper>
  )
}

export default CommentBox

const StyledWrapper = styled.section`
  scroll-margin-top: 6rem;
  margin-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray6};
  padding-top: 2rem;

  .heading {
    margin-bottom: 1.5rem;

    span {
      color: ${({ theme }) => theme.colors.gray10};
      font-size: 0.75rem;
      line-height: 1rem;
      text-transform: uppercase;
    }

    h2 {
      margin-top: 0.25rem;
      color: ${({ theme }) => theme.colors.gray12};
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 700;
    }
  }
`
