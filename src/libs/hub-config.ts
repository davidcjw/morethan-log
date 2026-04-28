export type HubSlug =
  | "smart-home-singapore"
  | "hdb-smart-home-guide"
  | "matter-thread-zigbee-wifi"

export type HubConfig = {
  slug: HubSlug
  title: string
  description: string
  eyebrow: string
  postListTitle: string
  topics: string[]
  match: string[]
}

export type PublicHubConfig = Omit<HubConfig, "match">

export const HUBS: Record<HubSlug, HubConfig> = {
  "smart-home-singapore": {
    slug: "smart-home-singapore",
    title: "Smart Home Singapore",
    eyebrow: "Smart home guides",
    description:
      "Practical smart home guides for Singapore homes, with a focus on HDB flats, reliable networking, local control, lighting, cameras, locks, and sensible buying decisions.",
    postListTitle: "Smart home guides for Singapore",
    topics: [
      "Singapore HDB",
      "Smart lighting",
      "Home networking",
      "Privacy",
      "Buying guides",
    ],
    match: [
      "smart home",
      "singapore",
      "hdb",
      "bto",
      "matter",
      "thread",
      "zigbee",
      "wi-fi",
      "wifi",
      "home assistant",
      "tuya",
      "aqara",
      "lighting",
      "camera",
      "lock",
    ],
  },
  "hdb-smart-home-guide": {
    slug: "hdb-smart-home-guide",
    title: "HDB Smart Home Guide",
    eyebrow: "Singapore HDB planning",
    description:
      "A focused guide to planning a reliable smart home for Singapore HDB flats, from renovation wiring and network layout to smart lighting, appliances, cameras, locks, and daily reliability.",
    postListTitle: "HDB-focused planning guides",
    topics: [
      "Renovation",
      "Neutral wires",
      "Router and mesh",
      "Switches",
      "Cameras",
    ],
    match: [
      "hdb",
      "bto",
      "renovation",
      "renovating",
      "reno",
      "wiring",
      "neutral",
      "switch",
      "lighting",
      "network",
      "mesh",
      "router",
      "camera",
      "lock",
      "aircon",
      "appliance",
    ],
  },
  "matter-thread-zigbee-wifi": {
    slug: "matter-thread-zigbee-wifi",
    title: "Matter, Thread, Zigbee, and Wi-Fi",
    eyebrow: "Protocols and platforms",
    description:
      "A practical comparison hub for Matter, Thread, Zigbee, Wi-Fi, Tuya, Aqara, Home Assistant, and smart home interoperability choices in Singapore.",
    postListTitle: "Protocol and platform guides",
    topics: ["Matter", "Thread", "Zigbee", "Wi-Fi", "Home Assistant"],
    match: [
      "matter",
      "thread",
      "zigbee",
      "wi-fi",
      "wifi",
      "tuya",
      "aqara",
      "home assistant",
      "interoperability",
      "local",
      "privacy",
      "protocol",
    ],
  },
}

export const HUB_LIST: PublicHubConfig[] = Object.values(HUBS).map(
  ({ match, ...hub }) => hub
)
