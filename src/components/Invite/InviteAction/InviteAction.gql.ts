import { graphql } from 'react-relay';

export const inviteActionQuery = graphql`
  query InviteActionQuery($inviteLink: String!) {
    getInviteInfo(inviteLink: $inviteLink) {
      UserInvitor
      TeamName
    }
  }
`;

export const inviteActionMutation = graphql`
  mutation InviteActionMutation($input: AcceptInviteInput!) {
    acceptInvite(input: $input) {
      Error
      User {
        id
        teamId
      }
    }
  }
`;
