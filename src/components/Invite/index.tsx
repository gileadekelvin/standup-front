import { Stack, Typography } from '@mui/joy';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import InviteAction from './InviteAction';

const Invite = () => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Stack mt={2}>
      <Typography level='h3'>{t('settings.invite.accept.title')}</Typography>
      {router.query.inviteLink && typeof router.query.inviteLink === 'string' && (
        <InviteAction inviteLink={router.query.inviteLink as string} />
      )}
      {!router.query.inviteLink && (
        <Typography
          variant='soft'
          color='danger'
          p={1}
          mt={2}
          borderRadius='xs'
          startDecorator='🚨'
          display='inline-flex'
          fontSize='sm'
          sx={{ '--Typography-gap': '0.5rem', width: 'fit-content' }}
        >
          {t('settings.invite.invalid')}
        </Typography>
      )}
    </Stack>
  );
};

export default Invite;
