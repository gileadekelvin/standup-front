import { graphql } from 'react-relay';

export const myTeamQuery = graphql`
  query MyTeamQuery($first: Int = 5, $after: String = null) {
    me {
      team {
        ...DailiesFragment
      }
    }
  }
`;
