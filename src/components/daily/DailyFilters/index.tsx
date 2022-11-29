import { Stack, Switch, Typography } from '@mui/joy';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, isValid } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useDebouncedCallback } from 'use-debounce';

import { DailyFiltersProps } from './DailyFilters';

const DailyFilters = (props: DailyFiltersProps) => {
  const { filters, setFilters, currentUserId } = props;

  const { t } = useTranslation('common');

  const handleAuthorFilter = () => {
    setFilters({
      ...filters,
      UserId: filters.UserId ? null : currentUserId,
    });
  };

  const debounced = useDebouncedCallback((value) => {
    setFilters({
      ...filters,
      RangeDate: {
        startDate: new Date(value),
        endDate: addDays(new Date(value), 1),
      },
    });
  }, 1000);

  return (
    <Stack direction='row' spacing={2} sx={{ paddingX: '8px', paddingBottom: '8px' }}>
      <Typography
        component='label'
        level='body1'
        alignItems='end'
        endDecorator={<Switch onChange={handleAuthorFilter} size='sm' />}
      >
        {t('daily.filter.myDailies')}
      </Typography>
      <DatePicker
        label={t('daily.filter.byDate')}
        inputFormat='MM-dd-yyyy'
        value={filters.RangeDate?.startDate}
        InputProps={{ sx: { maxHeight: '30px', maxWidth: '150px' } }}
        onChange={(newValue) => {
          if (newValue && isValid(newValue)) {
            debounced(newValue);
          }
        }}
        renderInput={(params) => <TextField variant='standard' size='small' {...params} />}
      />
    </Stack>
  );
};

export default DailyFilters;
