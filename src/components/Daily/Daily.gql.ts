import { graphql } from 'react-relay';

export const dailyFrag = graphql`
  fragment DailyFragment on Daily {
    id
    updatedAt
  }
`;
