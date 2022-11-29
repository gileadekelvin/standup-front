import { graphql } from 'react-relay';

export const dailiesFrag = graphql`
  fragment DailiesFragment on Team
  @argumentDefinitions(
    filters: { type: "DailyFilters", defaultValue: null }
  )
  @refetchable(queryName: "DailiesConnectionQuery") {
    dailies(first: $first, after: $after, filters: $filters)
      @connection(key: "DailiesConnection__dailies") {
      __id
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          ...DailyFragment
        }
      }
    }
  }
`;
