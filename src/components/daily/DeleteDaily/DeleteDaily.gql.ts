import { graphql } from 'react-relay';

export const deleteDailyMutation = graphql`
  mutation DeleteDailyMutation($input: DeleteDailyInput!) {
    deleteDaily(input: $input) {
      Error
      Daily {
        id @deleteRecord
      }
    }
  }
`;
