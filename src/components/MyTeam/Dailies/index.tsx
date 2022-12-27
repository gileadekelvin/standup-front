import { usePaginationFragment } from 'react-relay';
import { Box, Button, Grid } from '@mui/joy';

import Daily from '../../daily/Daily';
import { DailyListProps } from './Dailies';
import { dailiesFrag } from './Dailies.gql';
import { DailiesFragment$key } from '../../../../__generated__/DailiesFragment.graphql';
import { DailiesConnectionQuery } from '../../../../__generated__/DailiesConnectionQuery.graphql';

const DailyList = (props: DailyListProps) => {
  const { data, loadNext } = usePaginationFragment<DailiesConnectionQuery, DailiesFragment$key>(
    dailiesFrag,
    props.data,
  );

  return (
    <Grid container spacing={1} justifyContent='center'>
      {data?.dailies?.edges?.map(
        (daily) =>
          daily?.node && (
            <Grid key={daily?.node.id} xs={12}>
              <Daily data={daily?.node} userId={props.userId} />
            </Grid>
          ),
      )}
      {(data?.dailies?.totalCount ?? 0) > 0 && data?.dailies?.pageInfo.hasNextPage && (
        <Box textAlign='center' my={2}>
          <Button
            size='sm'
            variant='soft'
            sx={{ fontWeight: '600' }}
            onClick={() => {
              loadNext(10);
            }}
          >
            Load more
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default DailyList;
