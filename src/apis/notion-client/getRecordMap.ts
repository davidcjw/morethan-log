import { NotionAPI } from "notion-client"
import { runNotionRequest } from "./request"

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  const recordMap = await runNotionRequest(`getRecordMap:${pageId}`, () =>
    api.getPage(pageId, { concurrency: 1 })
  )
  return recordMap
}
