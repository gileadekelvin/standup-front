import { graphql } from 'react-relay';

export const filtersQuery = graphql`
  query FiltersQuery {
    me {
      _id
    }
  }
`;
