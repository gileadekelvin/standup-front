import {
  useTheme,
  Button,
  Modal,
  ModalDialog,
  Typography,
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
  const { open, handleClose, handleCancel, handleSave, loading, title, initialValues } = props;

  const joyTheme = useTheme();
  const isMobile = useMediaQuery(joyTheme.breakpoints.down('sm'));
  const { t } = useTranslation('common');

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: initialValues ?? {
      yesterday: [{ text: '' }],
      today: [{ text: '' }],
      blocks: [{ text: '' }],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSave({
      yesterday: data.yesterday?.filter((task) => task.text),
      today: data.today?.filter((task) => task.text),
      blocks: data.blocks?.filter((task) => task.text),
    });
  };

  const renderActions = () => (
    <>
      <Button
        size='sm'
        variant='plain'
        disabled={loading}
        sx={{ fontWeight: 'bolder', color: 'text.primary' }}
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
        sx={{ fontWeight: 'bolder' }}
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
          paddingX: 0,
          minWidth: {
            sm: '600px',
            xl: '800px',
          },
        }}
      >
        <Typography level='h2' fontSize='lg' px={2} pb={3}>
          {title ?? t('daily.create.title')}
        </Typography>
        <Box overflow='auto' maxHeight={{ xs: '90vh', md: '70vh' }} px={2}>
          <Stack spacing={1.5} sx={{ marginBottom: 4 }}>
            <TaskInput
              title='yesterday'
              color={joyTheme.vars.palette.neutral.plainHoverBg}
              control={control}
            />
            <TaskInput
              title='today'
              color={joyTheme.vars.palette.neutral.plainHoverBg}
              control={control}
            />
            <TaskInput
              title='blocks'
              color={joyTheme.vars.palette.neutral.plainHoverBg}
              control={control}
            />
          </Stack>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>{renderActions()}</Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default DailyInputDialog;
