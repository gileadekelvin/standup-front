import { graphql } from 'react-relay';

export const dailyFrag = graphql`
  fragment DailyFragment on Daily {
    id
    author {
      name
      userId
    }
    yesterday {
      text
    }
    today {
      text
    }
    blocks {
      text
    }
    createdAt
  }
`;
