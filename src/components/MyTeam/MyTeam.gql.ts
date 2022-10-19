import { graphql } from 'react-relay';

export const myTeamQuery = graphql`
  query MyTeamQuery($first: Int = 10, $after: String = null) {
    me {
      team {
        ...DailiesFragment
      }
    }
  }
`;
