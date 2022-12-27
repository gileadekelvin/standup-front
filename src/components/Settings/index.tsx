import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';
import { useSession, signOut } from 'next-auth/react';
import { Box, Button, Card, CardOverflow, Divider, Link, Stack, Typography } from '@mui/joy';
import LinearProgress from '@mui/joy/LinearProgress';
import { useLazyLoadQuery } from 'react-relay';

import { SettingsQuery } from '../../../__generated__/SettingsQuery.graphql';
import { settingsQuery } from './Settings.gql';
import InviteLink from './InviteLink';

export default function Component() {
  const { data: session, status } = useSession();

  const { t } = useTranslation('common');

  const data = useLazyLoadQuery<SettingsQuery>(
    settingsQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  if (status === 'loading') {
    return <LinearProgress variant='soft' size='sm' />;
  }

  const renderUserCard = () => (
    <Box>
      <Typography level='h4'>{t('settings.you')}</Typography>
      <Card variant='outlined' sx={{ width: 320, marginTop: 1 }}>
        <Typography level='h2' sx={{ fontSize: 'md' }}>
          {data.me?.name}
        </Typography>
        <Typography level='body2' sx={{ mt: 0.5, mb: 2 }}>
          {data.me?.email}
        </Typography>
        <Divider />
        <CardOverflow
          variant='soft'
          sx={{
            display: 'flex',
            gap: 1.5,
            py: 1.5,
            px: 'var(--Card-padding)',
            bgcolor: 'background.level1',
          }}
        >
          <Typography level='body3' sx={{ fontWeight: 'md', color: 'text.secondary' }}>
            {data.me?.team?.name}
          </Typography>
        </CardOverflow>
      </Card>
    </Box>
  );

  if (session) {
    return (
      <Stack spacing={5} mt={2} alignSelf='center'>
        {data && renderUserCard()}
        {data.me?.role.name === 'admin' && <InviteLink />}
        <Box alignSelf='center' pt={6}>
          <Button
            sx={{ maxWidth: '120px', fontWeight: 700 }}
            color='danger'
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </Box>
      </Stack>
    );
  }

  return (
    <NextLink href='/auth/login' passHref>
      <Link>Login</Link>
    </NextLink>
  );
}
