import { PreloadedQuery } from 'react-relay';

import { MyTeamQuery } from '../../../../__generated__/MyTeamQuery.graphql';

export type DailyListProps = {
  queryReference: PreloadedQuery<MyTeamQuery>;
};
