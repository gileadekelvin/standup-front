import { Button, Stack, Typography } from '@mui/joy';
import { useTranslation } from 'next-i18next';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { toast } from 'react-toastify';

import { InviteActionMutation } from '../../../../__generated__/InviteActionMutation.graphql';
import { InviteActionQuery } from '../../../../__generated__/InviteActionQuery.graphql';
import { InviteActionProps } from './InviteAction';
import { inviteActionMutation, inviteActionQuery } from './InviteAction.gql';

const InviteAction = (props: InviteActionProps) => {
  const data = useLazyLoadQuery<InviteActionQuery>(
    inviteActionQuery,
    { inviteLink: props.inviteLink },
    { fetchPolicy: 'store-or-network' },
  );

  const { t } = useTranslation();

  const [commitMutation] = useMutation<InviteActionMutation>(inviteActionMutation);

  const handleAccept = () => {
    commitMutation({
      variables: {
        input: {
          inviteLink: props.inviteLink,
        },
      },
      onCompleted(response) {
        if (response.acceptInvite?.Error) {
          toast.error(
            t('settings.invite.accept.errorMessage', { error: response.acceptInvite?.Error }),
          );
        }
        if (!response.acceptInvite?.Error && response.acceptInvite?.User) {
          toast.success(t('settings.invite.accept.successMessage'));
        }
      },
      onError(_error) {
        toast.error(t('defaultError'));
      },
    });
  };

  return (
    <Stack mt={2}>
      <Typography level='body1' fontWeight={600}>
        {t('settings.invite.accept.text')}
      </Typography>
      <Typography level='body1' component='span'>
        {`${data.getInviteInfo?.UserInvitor} invited you`}
      </Typography>
      <Typography level='body1' component='span'>
        {`Team: ${data.getInviteInfo?.TeamName}`}
      </Typography>
      <Typography level='body2' mt={1}>
        {t('settings.invite.accept.warning')}
      </Typography>
      <Button sx={{ maxWidth: '100px', fontWeight: 700, marginTop: '16px' }} onClick={handleAccept}>
        {t('settings.invite.accept.action')}
      </Button>
    </Stack>
  );
};

export default InviteAction;
