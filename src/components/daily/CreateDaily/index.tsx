import { useTranslation } from 'next-i18next';
import { ModalProps } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';

import DailyInputDialog from '../DailyInputDialog';

const CreateDaily = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation('common');

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
      <DailyInputDialog open={open} handleClose={handleClose} handleCancel={handleCancel} />
    </>
  );
};

export default CreateDaily;
