import { Suspense } from 'react';
import {
  PreloadedQuery,
  useQueryLoader,
  usePreloadedQuery,
} from 'react-relay';

import { MyTeamQuery } from '../../__generated__/MyTeamQuery.graphql';
import Daily from '../Daily';
import { myTeamQuery } from './MyTeam.gql';

type DailyListProps = {
  queryReference: PreloadedQuery<MyTeamQuery>;
};

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

const MyTeam = () => {
  const [queryReference, loadQuery] = useQueryLoader<MyTeamQuery>(myTeamQuery);

  if (queryReference === null) {
    return <a onClick={() => loadQuery({})}> Click to reveal the name </a>;
  }

  return (
    <>
      <Suspense fallback={'Loading...'}>
        {queryReference && <DailyList queryReference={queryReference} />}I
      </Suspense>
    </>
  );
};

export default MyTeam;
