import { Typography } from '@mui/joy';
import Card from '@mui/joy/Card';

import { TaskProps } from './Task';

const Task = (props: TaskProps) => {
  const { task, color } = props;

  return (
    <Card
      variant='outlined'
      sx={{
        minWidth: 250,
        '--Card-radius': (theme) => theme.vars.radius.xs,
        boxShadow: 'none',
        padding: 1,
        borderLeftWidth: '4px',
        borderColor: color,
      }}
    >
      <Typography level='body1'>{task.text}</Typography>
    </Card>
  );
};

export default Task;
