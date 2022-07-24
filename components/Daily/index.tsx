import { useFragment } from 'react-relay';

import { DailyFragment$key } from '../../__generated__/DailyFragment.graphql';

import { dailyFrag } from './Daily.gql';

type DailyProps = {
  data: DailyFragment$key;
};

const Daily = (props: DailyProps) => {
  const daily = useFragment(dailyFrag, props.data);

  return <p>{daily.updatedAt}</p>;
};

export default Daily;
