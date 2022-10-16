import { Stack } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { Button, Typography, Box, Textarea, IconButton } from '@mui/joy';
import { useTranslation } from 'next-i18next';
import { Controller, useFieldArray } from 'react-hook-form';

import { TaskInputProps } from './TaskInput';

const TaskInput = (props: TaskInputProps) => {
  const { title, color, control } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: title,
  });

  const { t } = useTranslation('common');

  return (
    <Stack spacing={1}>
      <Typography
        level='body1'
        fontWeight='lg'
        sx={{
          width: 'fit-content',
          backgroundColor: color,
        }}
      >
        {t(`daily.${title}`)}
      </Typography>
      <Box>
        <Stack spacing={1}>
          {fields.map((item, index) => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box width='100%'>
                <Controller
                  render={({ field }) => (
                    <Textarea {...field} sx={{ borderColor: color, fontSize: '14px' }} />
                  )}
                  name={`${title}.${index}.text`}
                  control={control}
                />
              </Box>
              <IconButton
                variant='plain'
                size='sm'
                color='neutral'
                onClick={() => {
                  remove(index);
                }}
              >
                <Close />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box textAlign='center'>
        <Button
          size='sm'
          variant='plain'
          onClick={() => {
            append({ text: '' });
          }}
        >
          {t('daily.addTask')}
        </Button>
      </Box>
    </Stack>
  );
};

export default TaskInput;
