import { usePreloadedQuery } from 'react-relay';

import Daily from '../../Daily';
import { myTeamQuery } from '../MyTeam.gql';
import { DailyListProps } from './Dailies';

const DailyList = (props: DailyListProps) => {
  const data = usePreloadedQuery(myTeamQuery, props.queryReference);

  return (
    <>
      {data.me?.team?.dailies?.totalCount}
      {data.me?.team?.dailies?.edges?.map(
        (daily) => daily?.node && <Daily key={daily?.node.id} data={daily?.node} />,
      )}
    </>
  );
};

export default DailyList;
