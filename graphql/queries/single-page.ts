export const getSinglePageByPathQuery: string = `query Pages($path: String!, $locale: String!) {
                  pages {
                      singleByPath(path: $path, locale: $locale) {
                          id
                          title
                          content
                          updatedAt
                      }
                  }
}`;

export const getVersioningListQuery: string = `query Pages($id: Int!, $getLatest: Boolean) {
                  pages {
                      history(id: $id, getLatest: $getLatest) {
                          trail {
                            versionId
                            versionDate
                            authorId
                            authorName
                            actionType
                            valueBefore
                            valueAfter
                            version
                        }
                      }
                  }
}`;

export const getSinglePageByVersionQuery: string = `query Pages($pageId: Int!, $versionId: Int!) {
                  pages {
                      version(pageId: $pageId, versionId: $versionId) {
                          action                         
                          content
                          contentType
                          createdAt
                          versionDate
                          description
                          locale
                          pageId
                          path
                          publishEndDate
                          publishStartDate                    
                          title
                          versionId
                          version
                      }
                  }
}`;
