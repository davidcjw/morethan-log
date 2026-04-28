import HubPage from "src/routes/Hub"
import { getHubStaticProps, HubPageProps } from "src/libs/hubs"
import { NextPageWithLayout } from "src/types"

export const getStaticProps = getHubStaticProps("hdb-smart-home-guide")

const HdbSmartHomeGuidePage: NextPageWithLayout<HubPageProps> = (props) => {
  return <HubPage {...props} />
}

export default HdbSmartHomeGuidePage
