import { graphql } from 'react-relay';

export const dailiesFrag = graphql`
  fragment DailiesFragment on Team @refetchable(queryName: "DailiesConnectionQuery") {
    dailies(first: $first, after: $after) @connection(key: "DailiesConnection__dailies") {
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
