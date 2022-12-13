import * as React from 'react';
import { Box, useTheme } from '@mui/joy';
import Card from '@mui/joy/Card';
import { format } from 'date-fns';
import { useFragment } from 'react-relay';
import { useTranslation } from 'next-i18next';

import AvatarUser from '../../ui/AvatarUser';
import TaskList from '../../ui/TaskList';
import Actions from './Actions';
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
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, gap: 1, mb: 1 }}>
        <AvatarUser
          name={daily.author.name}
          date={format(new Date(daily.createdAt), 'dd MMM yyyy')}
        />
        <Actions id={daily.id} daily={props.data} />
      </Box>
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
