import { Suspense } from 'react';
import { useQueryLoader } from 'react-relay';
import { Grid, Box, Button } from '@mui/joy';
import { LinearProgress } from '@mui/material';

import { MyTeamQuery } from '../../../__generated__/MyTeamQuery.graphql';
import CreateDaily from '../daily/CreateDaily';
import { myTeamQuery } from './MyTeam.gql';
import Dailies from './Dailies';

const MyTeam = () => {
  const [queryReference, loadQuery] = useQueryLoader<MyTeamQuery>(myTeamQuery);
  if (queryReference === null) {
    return (
      <Box>
        <Button onClick={() => loadQuery({})}>Load Dailies</Button>
      </Box>
    );
  }
  return (
    <Grid container spacing={1} direction='column' sx={{ mx: 'auto', maxWidth: 600 }}>
      <Grid xs={12} mx={0.5} mt={1}>
        <CreateDaily />
      </Grid>
      <Grid xs={12}>
        <Suspense fallback={<LinearProgress />}>
          {queryReference && <Dailies queryReference={queryReference} />}
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default MyTeam;
