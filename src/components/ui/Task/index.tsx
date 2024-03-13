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
        '--Card-radius': 0,
        boxShadow: 'none',
        borderLeftWidth: '4px',
        padding: 1,
        borderColor: color,
      }}
    >
      <Typography level='body1'>
        {task.text}
      </Typography>
    </Card>
  );
};

export default Task;
