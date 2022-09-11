import { Suspense } from 'react';
import { useQueryLoader } from 'react-relay';
import { Box, Button } from '@mui/joy';
import { LinearProgress } from '@mui/material';

import { MyTeamQuery } from '../../../__generated__/MyTeamQuery.graphql';
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
    <Suspense fallback={<LinearProgress />}>
      {queryReference && <Dailies queryReference={queryReference} />}
    </Suspense>
  );
};

export default MyTeam;
