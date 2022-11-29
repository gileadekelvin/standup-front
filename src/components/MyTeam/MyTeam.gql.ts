import { graphql } from 'react-relay';

export const myTeamQuery = graphql`
  query MyTeamQuery(
    $first: Int = 10
    $after: String = null
    $filters: DailyFilters = { UserId: null, RangeDate: { startDate: null, endDate: null } }
  ) {
    me {
      _id
      team {
        ...DailiesFragment @arguments(filters: $filters)
      }
    }
  }
`;
