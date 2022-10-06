import { useTranslation } from 'next-i18next';
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

  const [commitMutation] = useMutation<CreateDailyMutation>(createDailyMutation);

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
    });
  };

  return (
    <>
      <Button
        size='sm'
        startIcon={<AddIcon />}
        variant='soft'
        sx={{ fontWeight: '600' }}
        onClick={handleClickOpen}
      >
        {t('daily.create.title')}
      </Button>
      <DailyInputDialog
        open={open}
        handleClose={handleClose}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </>
  );
};

export default CreateDaily;
