import { graphql } from 'react-relay';

export const createDailyMutation = graphql`
  mutation CreateDailyMutation($input: CreateDailyInput!, $connections: [ID!]!) {
    createDaily(input: $input) {
      Error
      Daily @prependNode(connections: $connections, edgeTypeName: "DailiesConnection__dailies") {
        ...DailyFragment
      }
    }
  }
`;
