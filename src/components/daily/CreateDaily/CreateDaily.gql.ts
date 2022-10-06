import { graphql } from 'react-relay';

export const createDailyMutation = graphql`
  mutation CreateDailyMutation($input: CreateDailyInput!) {
    createDaily(input: $input) {
      Error
      Daily {
        id
      }
    }
  }
`;
