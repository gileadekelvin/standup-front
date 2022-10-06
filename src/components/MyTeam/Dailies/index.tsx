import { usePreloadedQuery } from 'react-relay';
import { Grid } from '@mui/joy';

import Daily from '../../daily/Daily';
import { myTeamQuery } from '../MyTeam.gql';
import { DailyListProps } from './Dailies';

const DailyList = (props: DailyListProps) => {
  const data = usePreloadedQuery(myTeamQuery, props.queryReference);

  return (
    <Grid container spacing={1}>
      {data.me?.team?.dailies?.edges?.map(
        (daily) =>
          daily?.node && (
            <Grid key={daily?.node.id} xs={12}>
              <Daily data={daily?.node} />
            </Grid>
          ),
      )}
    </Grid>
  );
};

export default DailyList;
