import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useFragment, useMutation } from 'react-relay';
import { Box, ListItemDecorator, ModalProps, Typography } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';

import DailyInputDialog from '../DailyInputDialog';
import { updateDailyMutation } from './UpdateDaily.gql';
import {
  UpdateDailyInput,
  UpdateDailyMutation,
} from '../../../../__generated__/UpdateDailyMutation.graphql';
import { UpdateDailyProps } from './UpdateDaily';
import { dailyFrag } from '../Daily/Daily.gql';
import { FormValues } from '../DailyInputDialog/DailyInputDialog';

const UpdateDaily = (props: UpdateDailyProps) => {
  const { id } = props;

  const [open, setOpen] = useState(false);
  const { t } = useTranslation('common');

  const daily = useFragment(dailyFrag, props.daily);

  const [commitMutation, isMutationInFlight] =
    useMutation<UpdateDailyMutation>(updateDailyMutation);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose: ModalProps['onClose'] = (_event, reason) => {
    if (reason && reason == 'backdropClick') return;
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = (input: UpdateDailyInput) => {
    commitMutation({
      variables: {
        input,
      },
      onCompleted(response) {
        if (response.updateDaily?.Error) {
          toast.error(t('daily.update.errorMessage', { error: response.updateDaily?.Error }));
        }
        if (!response.updateDaily?.Error && response.updateDaily?.Daily) {
          setOpen(false);
          toast.success(t('daily.update.successMessage'));
        }
      },
      onError(_error) {
        toast.error(t('defaultError'));
      },
    });
  };

  return (
    <>
      <Box width='100%' px={1} py={1} display='flex' onClick={handleClickOpen}>
        <ListItemDecorator>
          <EditIcon />
        </ListItemDecorator>
        <Typography level='body1'>{t('edit')}</Typography>
      </Box>
      {open && (
        <DailyInputDialog
          initialValues={daily as FormValues}
          open={open}
          handleClose={handleClose}
          handleCancel={handleCancel}
          handleSave={(values) => handleSave({ id, ...values })}
          loading={isMutationInFlight}
          title={t('daily.update.title')}
        />
      )}
    </>
  );
};

export default UpdateDaily;
