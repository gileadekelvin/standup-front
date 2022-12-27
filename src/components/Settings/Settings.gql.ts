import { graphql } from 'react-relay';

export const settingsQuery = graphql`
  query SettingsQuery {
    me {
      _id
      name
      email
      team {
        name
      }
      role {
        name
      }
    }
  }
`;
