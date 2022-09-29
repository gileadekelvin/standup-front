import { Stack } from '@mui/material';
import { Button, Typography, Box, Textarea } from '@mui/joy';
import { useTranslation } from 'next-i18next';
import { Controller } from 'react-hook-form';

import { TaskInputProps } from './TaskInput';

const TaskInput = (props: TaskInputProps) => {
  const { title, color, fields, control, append } = props;

  const { t } = useTranslation('common');

  return (
    <Stack spacing={1}>
      <Typography
        fontSize='sm'
        fontWeight='lg'
        textColor='text.primary'
        sx={{
          width: 'fit-content',
          backgroundColor: color,
        }}
      >
        {t(title)}
      </Typography>
      <Box>
        <Stack spacing={1}>
          {fields.map((item, index) => (
            <Controller
              key={item.id}
              render={({ field }) => (
                <Textarea {...field} sx={{ borderColor: color, fontSize: '14px' }} />
              )}
              name={`${title}.${index}.text`}
              control={control}
            />
          ))}
        </Stack>
      </Box>
      <Box textAlign='center'>
        <Button
          size='sm'
          variant='soft'
          onClick={() => {
            append({ text: '' });
          }}
        >
          {t('add')}
        </Button>
      </Box>
    </Stack>
  );
};

export default TaskInput;
