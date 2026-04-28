import HubPage from "src/routes/Hub"
import { getHubStaticProps, HubPageProps } from "src/libs/hubs"
import { NextPageWithLayout } from "src/types"

export const getStaticProps = getHubStaticProps("smart-home-singapore")

const SmartHomeSingaporePage: NextPageWithLayout<HubPageProps> = (props) => {
  return <HubPage {...props} />
}

export default SmartHomeSingaporePage
