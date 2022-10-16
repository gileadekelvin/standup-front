import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useMutation } from 'react-relay';
import { ModalProps } from '@mui/material';
import { Button } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';

import {
  CreateDailyMutation,
  CreateDailyInput,
} from '../../../../__generated__/CreateDailyMutation.graphql';
import DailyInputDialog from '../DailyInputDialog';
import { createDailyMutation } from './CreateDaily.gql';

const CreateDaily = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation('common');

  const [commitMutation, isMutationInFlight] =
    useMutation<CreateDailyMutation>(createDailyMutation);

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

  const handleSave = (input: CreateDailyInput) => {
    commitMutation({
      variables: {
        input,
      },
      onCompleted(response) {
        if (response.createDaily?.Error) {
          toast.error(t('daily.create.errorMessage', { error: response.createDaily?.Error }));
        }
        if (!response.createDaily?.Error && response.createDaily?.Daily) {
          setOpen(false);
          toast.success(t('daily.create.successMessage'));
        }
      },
      onError(error) {
        toast.error(t('defaultError'));
      },
    });
  };

  return (
    <>
      <Button
        size='sm'
        startDecorator={<AddIcon />}
        variant='soft'
        sx={{ fontWeight: '600' }}
        onClick={handleClickOpen}
      >
        {t('daily.create.title')}
      </Button>
      {open && (
        <DailyInputDialog
          open={open}
          handleClose={handleClose}
          handleCancel={handleCancel}
          handleSave={handleSave}
          loading={isMutationInFlight}
        />
      )}
    </>
  );
};

export default CreateDaily;
