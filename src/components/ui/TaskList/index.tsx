import { Typography } from '@mui/joy';
import { Stack } from '@mui/material';

import Task from '../Task';
import { TaskListProps } from './TaskList';

const TaskList = (props: TaskListProps) => {
  const { title, color, tasks } = props;
  return (
    <Stack pb={2} spacing={1}>
      <Typography
        level='body1'
        fontWeight='lg'
        textColor='text.primary'
        sx={{
          width: '70px',
        }}
      >
        {title}
      </Typography>
      {tasks?.map((task, i) => task && <Task key={i} task={task} color={color} />)}
    </Stack>
  );
};

export default TaskList;
