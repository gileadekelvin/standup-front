import { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { Grid } from '@mui/joy';
import { LinearProgress } from '@mui/material';

import { MyTeamQuery } from '../../../__generated__/MyTeamQuery.graphql';
import CreateDaily from '../daily/CreateDaily';
import { myTeamQuery } from './MyTeam.gql';
import Dailies from './Dailies';

const MyTeam = () => {
  const data = useLazyLoadQuery<MyTeamQuery>(myTeamQuery, { first: 10 });

  return (
    <Grid container spacing={1} direction='column' sx={{ mx: 'auto', maxWidth: 600 }}>
      <Grid xs={12} mx={0.5} mt={1}>
        <CreateDaily />
      </Grid>
      <Grid xs={12}>
        <Suspense fallback={<LinearProgress />}>
          {data.me?.team && <Dailies data={data.me.team} />}
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default MyTeam;
