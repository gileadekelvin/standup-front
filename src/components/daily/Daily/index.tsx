import * as React from 'react';
import { Box, Typography, useTheme } from '@mui/joy';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { format } from 'date-fns';
import { useFragment } from 'react-relay';
import { useTranslation } from 'next-i18next';

import AvatarUser from '../../ui/AvatarUser';
import TaskList from '../../ui/TaskList';
import { DailyFragment$key } from '../../../../__generated__/DailyFragment.graphql';
import { dailyFrag } from './Daily.gql';

type DailyProps = {
  data: DailyFragment$key;
};

const Daily = (props: DailyProps) => {
  const daily = useFragment(dailyFrag, props.data);

  const joyTheme = useTheme();

  const { t } = useTranslation('common');

  return (
    <Card
      variant='outlined'
      sx={{
        minWidth: 300,
        '--Card-radius': (theme) => theme.vars.radius.xs,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, gap: 1 }}>
        <AvatarUser name={daily.author.name} />
        <IconButton variant='plain' color='neutral' size='sm' sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </Box>
      <Typography fontSize='14px' fontWeight='700' sx={{ color: 'text.secondary', mb: 1 }}>
        {format(new Date(daily.createdAt), 'yyyy-MM-dd')}
      </Typography>
      <TaskList
        title={t('daily.yesterday')}
        color={joyTheme.vars.palette.info.plainHoverBg}
        tasks={daily.yesterday}
      />
      <TaskList
        title={t('daily.today')}
        color={joyTheme.vars.palette.warning.plainHoverBg}
        tasks={daily.today}
      />
      <TaskList
        title={t('daily.blocks')}
        color={joyTheme.vars.palette.danger.plainHoverBg}
        tasks={daily.blocks}
      />
    </Card>
  );
};

export default Daily;