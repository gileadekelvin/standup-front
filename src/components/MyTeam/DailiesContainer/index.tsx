import { Box, Grid, Stack } from '@mui/joy';
import LinearProgress from '@mui/joy/LinearProgress';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay';

import CreateDaily from '../../daily/CreateDaily';
import { MyTeamQuery } from '../../../../__generated__/MyTeamQuery.graphql';
import { myTeamQuery } from '../MyTeam.gql';
import Dailies from '../Dailies';
import { DailiesContainerProps } from './DailiesContainer';

const DailiesContainer = (props: DailiesContainerProps) => {
  const { filters } = props;

  const data = useLazyLoadQuery<MyTeamQuery>(
    myTeamQuery,
    {
      filters: {
        UserId: filters.UserId,
        RangeDate: {
          startDate: filters.RangeDate?.startDate
            ? format(utcToZonedTime(filters.RangeDate?.startDate, 'UTC'), 'yyyy-MM-dd HH:mm')
            : null,
          endDate: filters.RangeDate?.endDate
            ? format(utcToZonedTime(filters.RangeDate?.endDate, 'UTC'), 'yyyy-MM-dd HH:mm')
            : null,
        },
      },
    },
    {
      fetchPolicy: 'store-or-network',
    },
  );
  return (
    <Box mt={1}>
      <Suspense fallback={<LinearProgress variant='soft' size='sm' />}>
        {data.me?.team && (
          <Grid xs={12} mx={0.5} alignContent='flex-end'>
            <Stack direction='row' spacing={2}>
              <CreateDaily data={data.me.team} />
            </Stack>
          </Grid>
        )}
        <Grid xs={12}>{data.me?.team && <Dailies data={data.me.team} userId={data.me._id} />}</Grid>
      </Suspense>
    </Box>
  );
};

export default DailiesContainer;
