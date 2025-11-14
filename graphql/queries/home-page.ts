export const getGNBMenusQuery: string = `query Pages($tags: [String!]!) {
    pages {
        menu(tags: $tags) {
            id
            path
            locale
            title
            category
        }
    }
}
`;

export const getDevSiteProductsQuery: string = `query Pages($tags: [String!]!) {
    pages {
        menu(tags: $tags) {
            id
            path
            locale
            title
            description
            images           
        }
    }
}
`;
