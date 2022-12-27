import { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/joy';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'next-i18next';
import { fetchQuery, useRelayEnvironment } from 'react-relay';
import { toast } from 'react-toastify';

import { inviteLinkQuery } from './InviteLink.gql';
import { InviteLinkQuery } from '../../../../__generated__/InviteLinkQuery.graphql';

const InviteLink = () => {
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  const { t } = useTranslation('common');

  const env = useRelayEnvironment();

  const handleGenerateLink = () => {
    fetchQuery<InviteLinkQuery>(env, inviteLinkQuery, {})
      .toPromise()
      .then((data) => {
        if (data?.getInvite) {
          setInviteLink(data?.getInvite);
        } else {
          toast.error(t('settings.invite.error'));
        }
      })
      .catch(() => {
        toast.error(t('settings.invite.error'));
      });
  };

  const handleCopyLink = () => {
    if (!inviteLink) {
      return;
    }
    const origin =
      typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const inviteUrl = `${origin}/invite?inviteLink=${inviteLink}`;
    navigator.clipboard.writeText(inviteUrl);
  };

  return (
    <Box>
      <Typography level='h4'>{t('settings.invite.title')}</Typography>
      <Typography level='body1'>{t('settings.invite.subtitle')}</Typography>
      <Button
        sx={{ maxWidth: '240px', fontWeight: 700, marginTop: '16px' }}
        onClick={handleGenerateLink}
      >
        {t('settings.invite.action')}
      </Button>
      {inviteLink && (
        <Typography
          level='body3'
          mt={2}
          sx={{ overflowWrap: 'anywhere' }}
          endDecorator={
            <IconButton variant='plain' size='sm' onClick={handleCopyLink}>
              <ContentCopy />
            </IconButton>
          }
        >
          {`${inviteLink.substring(0, 40)}...`}
        </Typography>
      )}
    </Box>
  );
};

export default InviteLink;
