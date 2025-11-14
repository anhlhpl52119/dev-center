export const getLNBQuery: string = `query Pages(
              $path: String,
              $mode: PageTreeMode!,
              $locale: String!           
          ) {
              pages {
                  tree(
                      path: $path,
                      mode: $mode,
                      locale: $locale
                  ) {
                      id
                      path
                      depth
                      title
                      isPrivate
                      isFolder
                      privateNS
                      parent
                      pageId
                      locale
                  }
              }
          }
`;
