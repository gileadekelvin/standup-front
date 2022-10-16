import {
  useTheme,
  Button,
  Modal,
  ModalDialog,
  Typography,
  Divider,
  Box,
  Stack,
  CircularProgress,
} from '@mui/joy';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import TaskInput from './TaskInput';
import { DailyInputDialogProps, FormValues } from './DailyInputDialog';

const DailyInputDialog = (props: DailyInputDialogProps) => {
  const { open, handleClose, handleCancel, handleSave, loading } = props;

  const joyTheme = useTheme();
  const isMobile = useMediaQuery(joyTheme.breakpoints.down('sm'));
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
        endDecorator={loading && <CircularProgress size='sm' color='neutral' thickness={2} />}
      >
        {t('save')}
      </Button>
    </>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog
        variant='outlined'
        size='lg'
        layout={isMobile ? 'fullscreen' : 'center'}
        sx={{
          minWidth: {
            sm: '600px',
            xl: '800px',
          },
        }}
      >
        <Typography level='h2' fontSize='lg'>
          {t('daily.create.title')}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1.5} sx={{ marginBottom: 4 }}>
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
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>{renderActions()}</Box>
      </ModalDialog>
    </Modal>
  );
};

export default DailyInputDialog;
