import NextLink from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Box, Button, Card, CardOverflow, Divider, Link, Typography } from '@mui/joy';
import LinearProgress from '@mui/joy/LinearProgress';
import { useLazyLoadQuery } from 'react-relay';

import { SettingsQuery } from '../../../__generated__/SettingsQuery.graphql';
import { settingsQuery } from './Settings.gql';

export default function Component() {
  const { data: session, status } = useSession();

  const data = useLazyLoadQuery<SettingsQuery>(
    settingsQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  if (status === 'loading') {
    return <LinearProgress variant='soft' size='sm' />;
  }

  if (session) {
    return (
      <>
        {data && (
          <Card variant='outlined' sx={{ width: 320, alignSelf: 'center', marginTop: 3 }}>
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
        )}
        <Box alignSelf='center' pt={3}>
          <Button
            sx={{ maxWidth: '120px', fontWeight: 700 }}
            color='danger'
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </Box>
      </>
    );
  }

  return (
    <NextLink href='/auth/login' passHref>
      <Link>Login</Link>
    </NextLink>
  );
}
