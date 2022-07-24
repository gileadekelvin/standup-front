import { graphql } from 'react-relay';

export const myTeamQuery = graphql`
  query MyTeamQuery {
    me {
      team {
        dailies(first: 10) {
          totalCount
          edges {
            node {
              id
              ...DailyFragment
            }
          }
        }
      }
    }
  }
`;
