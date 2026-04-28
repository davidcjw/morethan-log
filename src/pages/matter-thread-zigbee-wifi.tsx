import HubPage from "src/routes/Hub"
import { getHubStaticProps, HubPageProps } from "src/libs/hubs"
import { NextPageWithLayout } from "src/types"

export const getStaticProps = getHubStaticProps("matter-thread-zigbee-wifi")

const MatterThreadZigbeeWifiPage: NextPageWithLayout<HubPageProps> = (
  props
) => {
  return <HubPage {...props} />
}

export default MatterThreadZigbeeWifiPage
