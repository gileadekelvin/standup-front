import { useLazyLoadQuery } from 'react-relay';

import DailyFiltersComponent from '../../daily/DailyFilters';
import { FiltersQuery } from '../../../../__generated__/FiltersQuery.graphql';
import { filtersQuery } from './Filters.gql';
import { FiltersProps } from './Filters';

const Filters = (props: FiltersProps) => {
  const { filters, setFilters } = props;

  const data = useLazyLoadQuery<FiltersQuery>(
    filtersQuery,
    {},
    {
      fetchPolicy: 'store-or-network',
    },
  );

  return (
    <>
      {data?.me?._id && (
        <DailyFiltersComponent
          filters={filters}
          setFilters={setFilters}
          currentUserId={data?.me?._id}
        />
      )}
    </>
  );
};

export default Filters;
