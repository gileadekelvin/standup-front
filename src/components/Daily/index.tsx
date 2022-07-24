import { useFragment } from 'react-relay';
import { Typography } from '@mui/joy';

import { DailyFragment$key } from '../../../__generated__/DailyFragment.graphql';
import { dailyFrag } from './Daily.gql';

type DailyProps = {
  data: DailyFragment$key;
};

const Daily = (props: DailyProps) => {
  const daily = useFragment(dailyFrag, props.data);

  return <Typography>{daily.updatedAt}</Typography>;
};

export default Daily;
