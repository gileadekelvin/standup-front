import { Suspense, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Grid, Stack } from '@mui/joy';
import LinearProgress from '@mui/joy/LinearProgress';

import { MyTeamQuery } from '../../../__generated__/MyTeamQuery.graphql';
import CreateDaily from '../daily/CreateDaily';
import DailyFiltersComponent from '../daily/DailyFilters';
import { DailyFilters } from '../daily/DailyFilters/DailyFilters';
import { myTeamQuery } from './MyTeam.gql';
import Dailies from './Dailies';

const MyTeam = () => {
  const [filters, setFilters] = useState<DailyFilters>({
    UserId: null,
    RangeDate: {
      startDate: null,
      endDate: null,
    },
  });

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
    <Suspense fallback={<LinearProgress variant='soft' size='sm' />}>
      <Grid container spacing={1} direction='column' sx={{ mx: 'auto', maxWidth: 600 }}>
        {data.me?.team && (
          <Grid xs={12} mx={0.5} mt={1}>
            <Stack direction='row' spacing={2}>
              <CreateDaily data={data.me.team} />
              <DailyFiltersComponent
                filters={filters}
                setFilters={setFilters}
                currentUserId={data?.me._id}
              />
            </Stack>
          </Grid>
        )}
        <Grid xs={12}>{data.me?.team && <Dailies data={data.me.team} />}</Grid>
      </Grid>
    </Suspense>
  );
};

export default MyTeam;
