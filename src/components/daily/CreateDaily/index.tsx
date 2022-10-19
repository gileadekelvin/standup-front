import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useFragment, useMutation } from 'react-relay';
import { Button, ModalProps } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';

import {
  CreateDailyMutation,
  CreateDailyInput,
} from '../../../../__generated__/CreateDailyMutation.graphql';
import DailyInputDialog from '../DailyInputDialog';
import { dailiesFrag } from '../../MyTeam/Dailies/Dailies.gql';
import { createDailyMutation } from './CreateDaily.gql';
import { DailiesFragment$key } from '../../../../__generated__/DailiesFragment.graphql';

const CreateDaily = (props: { data: DailiesFragment$key }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation('common');

  const data = useFragment(dailiesFrag, props.data);

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
        connections: [data!.dailies!.__id],
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
      onError(_error) {
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
