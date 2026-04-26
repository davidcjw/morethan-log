import { getBlockValue, getTextContent, getDateValue } from "notion-utils"
import { NotionAPI } from "notion-client"
import { BlockMap, CollectionPropertySchemaMap } from "notion-types"
import { customMapImageUrl } from "./customMapImageUrl"
import { runNotionRequest } from "src/apis/notion-client/request"

const missingUserWarnings = new Set<string>()

async function getPageProperties(
  id: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap
) {
  const api = new NotionAPI()
  const pageValue = getBlockValue(block?.[id])
  const rawProperties = Object.entries(pageValue?.properties || [])
  const excludeProperties = ["date", "select", "multi_select", "person", "file"]
  const properties: any = {}
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val]: any = rawProperties[i]
    properties.id = id
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val)
    } else {
      switch (schema[key]?.type) {
        case "file": {
          try {
            const url: string = val[0][1][0][1]
            const newurl = customMapImageUrl(url, pageValue!)
            properties[schema[key].name] = newurl
          } catch (error) {
            properties[schema[key].name] = undefined
          }
          break
        }
        case "date": {
          const dateProperty: any = getDateValue(val)
          delete dateProperty.type
          properties[schema[key].name] = dateProperty
          break
        }
        case "select": {
          const selects = getTextContent(val)
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",")
          }
          break
        }
        case "multi_select": {
          const selects = getTextContent(val)
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",")
          }
          break
        }
        case "person": {
          const rawUsers = val.flat()

          const users = []
          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0]
              const label = Array.isArray(userId)
                ? userId.join(":")
                : String(userId)
              let res: any
              try {
                res = await runNotionRequest(
                  `getUsers:${label}`,
                  () => api.getUsers(userId),
                  { maxRetries: 3 }
                )
              } catch {
                if (!missingUserWarnings.has(label)) {
                  console.warn(`missing user ${label}`)
                  missingUserWarnings.add(label)
                }
              }
              const resValue =
                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value
              const user = {
                id: resValue?.id ?? "",
                name:
                  resValue?.name ||
                  `${resValue?.family_name ?? ""}${
                    resValue?.given_name ?? ""
                  }` ||
                  "",
                profile_photo: resValue?.profile_photo ?? null,
              }
              users.push(user)
            }
          }
          properties[schema[key].name] = users
          break
        }
        default:
          break
      }
    }
  }
  return properties
}

export { getPageProperties as default }
