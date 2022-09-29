import { useTheme, Button } from '@mui/joy';
import { useTranslation } from 'next-i18next';
import { Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

import TaskInput from './TaskInput';
import { DailyInputDialogProps, FormValues } from './DailyInputDialog';

const DailyInputDialog = (props: DailyInputDialogProps) => {
  const { handleClose, handleCancel, open } = props;

  const joyTheme = useTheme();
  const { t } = useTranslation('common');

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      yesterday: [{ text: '' }],
      today: [{ text: '' }],
      blocks: [{ text: '' }],
    },
  });

  const { fields: fieldsYesterday, append: appendYesterday } = useFieldArray({
    control,
    name: 'yesterday',
  });
  const { fields: fieldsToday, append: appendToday } = useFieldArray({
    control,
    name: 'today',
  });
  const { fields: fieldsBlocks, append: appendBlocks } = useFieldArray({
    control,
    name: 'blocks',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const renderActions = () => (
    <>
      <Button size='sm' variant='plain' onClick={handleCancel}>
        {t('cancel')}
      </Button>
      <Button size='sm' variant='plain' type='submit' onClick={handleSubmit(onSubmit)}>
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
            title={'yesterday'}
            color={joyTheme.vars.palette.info.plainHoverBg}
            control={control}
            fields={fieldsYesterday}
            append={appendYesterday}
          />
          <TaskInput
            title={'today'}
            color={joyTheme.vars.palette.warning.plainHoverBg}
            control={control}
            fields={fieldsToday}
            append={appendToday}
          />
          <TaskInput
            title={'blocks'}
            color={joyTheme.vars.palette.danger.plainHoverBg}
            control={control}
            fields={fieldsBlocks}
            append={appendBlocks}
          />
        </Stack>
      </DialogContent>
      <DialogActions>{renderActions()}</DialogActions>
    </Dialog>
  );
};

export default DailyInputDialog;
