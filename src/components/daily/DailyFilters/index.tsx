import { Stack, Typography } from '@mui/joy';
import Switch from '@mui/joy/Switch';
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
        startDate: value ? new Date(value) : null,
        endDate: value ? addDays(new Date(value), 1) : null,
      },
    });
  }, 1000);

  return (
    <Stack direction='row' spacing={2} sx={{ paddingX: '8px', paddingBottom: '8px' }}>
      <Typography
        component='label'
        level='body1'
        alignItems='end'
        fontWeight={600}
        endDecorator={
          <Switch
            onChange={handleAuthorFilter}
            size='sm'
            sx={{
              '--Switch-thumb-size': '16px',
            }}
          />
        }
      >
        {t('daily.filter.myDailies')}
      </Typography>
      <DatePicker
        label={
          <Typography component='label' level='body1' fontWeight={600}>
            {t('daily.filter.byDate')}
          </Typography>
        }
        inputFormat='MM-dd-yyyy'
        value={filters.RangeDate?.startDate}
        InputProps={{ sx: { maxHeight: '30px', maxWidth: '150px', fontWeight: 600 } }}
        onChange={(newValue) => {
          if ((newValue && isValid(newValue)) || (!newValue && filters.RangeDate)) {
            debounced(newValue);
          }
        }}
        renderInput={(params) => <TextField variant='standard' size='small' {...params} />}
      />
    </Stack>
  );
};

export default DailyFilters;
