import { useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Grid } from '@mui/joy';

import { MyTeamQuery } from '../../../__generated__/MyTeamQuery.graphql';
import { DailyFilters } from '../daily/DailyFilters/DailyFilters';
import Filters from './Filters';
import DailiesContainer from './DailiesContainer';
import { myTeamQuery } from './MyTeam.gql';

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
    <Grid container spacing={1} direction='column' sx={{ mx: 'auto', maxWidth: 600 }}>
      <Filters filters={filters} setFilters={setFilters} />
      <DailiesContainer filters={filters} />
    </Grid>
  );
};

export default MyTeam;
