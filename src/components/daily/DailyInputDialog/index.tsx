import { useTheme, Button } from '@mui/joy';
import { useTranslation } from 'next-i18next';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

import TaskInput from './TaskInput';
import { DailyInputDialogProps, FormValues } from './DailyInputDialog';

const DailyInputDialog = (props: DailyInputDialogProps) => {
  const { open, handleClose, handleCancel, handleSave, loading } = props;

  const joyTheme = useTheme();
  const { t } = useTranslation('common');

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      yesterday: [{ text: '' }],
      today: [{ text: '' }],
      blocks: [{ text: '' }],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSave({
      yesterday: data.yesterday.filter((task) => task.text),
      today: data.today.filter((task) => task.text),
      blocks: data.blocks.filter((task) => task.text),
    });
  };

  const renderActions = () => (
    <>
      <Button
        size='sm'
        variant='outlined'
        disabled={loading}
        onClick={() => {
          handleCancel();
          reset();
        }}
      >
        {t('cancel')}
      </Button>
      <Button
        size='sm'
        variant='solid'
        type='submit'
        disabled={loading}
        onClick={handleSubmit(onSubmit)}
        endDecorator={loading && <CircularProgress size='1rem' color='inherit' />}
      >
        {t('save')}
      </Button>
    </>
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle fontWeight='600'>{t('daily.create.title')}</DialogTitle>
      <DialogContent>
        <Stack spacing={1.5}>
          <TaskInput
            title='yesterday'
            color={joyTheme.vars.palette.info.plainHoverBg}
            control={control}
          />
          <TaskInput
            title='today'
            color={joyTheme.vars.palette.warning.plainHoverBg}
            control={control}
          />
          <TaskInput
            title='blocks'
            color={joyTheme.vars.palette.danger.plainHoverBg}
            control={control}
          />
        </Stack>
      </DialogContent>
      <DialogActions>{renderActions()}</DialogActions>
    </Dialog>
  );
};

export default DailyInputDialog;
