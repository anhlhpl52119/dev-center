export const getCategoriesQuery: string = `query Pages($tags: [String!]!) {
    pages {
        menu(tags: $tags) {
            id
            title
            category
        }
    }
}
`;

export const getPagesBySearchQuery: string = `query Pages($query: String!, $category: String, $locale: String, $page: Int, $size: Int, $inCategory: [String]) {
    pages {
        search(
            query: $query
            category: $category
            locale: $locale
            page: $page
            size: $size
            inCategory: $inCategory
        ) {
            totalHits
            results
            description
        }
    }
}
`;
