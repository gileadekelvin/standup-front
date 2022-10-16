import { graphql } from 'react-relay';

export const updateDailyMutation = graphql`
  mutation UpdateDailyMutation($input: UpdateDailyInput!) {
    updateDaily(input: $input) {
      Error
      Daily {
        id
        yesterday {
          text
        }
        today {
          text
        }
        blocks {
          text
        }
      }
    }
  }
`;
