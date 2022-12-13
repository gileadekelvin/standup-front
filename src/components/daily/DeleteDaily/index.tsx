import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Box, Button, Divider, ListItemDecorator, Modal, ModalDialog, Typography } from '@mui/joy';
import { useMutation } from 'react-relay';
import { toast } from 'react-toastify';

import {
  DeleteDailyInput,
  DeleteDailyMutation,
} from '../../../../__generated__/DeleteDailyMutation.graphql';
import { deleteDailyMutation } from './DeleteDaily.gql';
import { DeleteDailyProps } from './DeleteDaily';

const DeleteDaily = (props: DeleteDailyProps) => {
  const { id } = props;
  const [open, setOpen] = useState(false);

  const { t } = useTranslation('common');

  const [commitMutation, isMutationInFlight] =
    useMutation<DeleteDailyMutation>(deleteDailyMutation);

  const handleDelete = (input: DeleteDailyInput) => {
    commitMutation({
      variables: {
        input,
      },
      onCompleted(response) {
        if (response.deleteDaily?.Error) {
          setOpen(false);
          toast.error(t('daily.delete.errorMessage', { error: response.deleteDaily?.Error }));
        }
        if (!response.deleteDaily?.Error && response.deleteDaily?.Daily) {
          setOpen(false);
          toast.success(t('daily.delete.successMessage'));
        }
      },
      onError(_error) {
        setOpen(false);
        toast.error(t('defaultError'));
      },
    });
  };

  return (
    <>
      <Box
        width='100%'
        px={1}
        py={1}
        display='flex'
        onClick={() => {
          setOpen(true);
        }}
      >
        <ListItemDecorator sx={{ color: 'inherit' }}>
          <DeleteForeverIcon />
        </ListItemDecorator>
        <Typography level='body1' color='danger' fontWeight={600}>
          {t('delete')}
        </Typography>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant='outlined' role='alertdialog'>
          <Typography level='h2' fontSize='lg' startDecorator={<WarningRoundedIcon />}>
            {t('confirmation')}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography level='body2' mb={3}>
            {t('daily.delete.confirmationMessage')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              variant='plain'
              color='neutral'
              disabled={isMutationInFlight}
              onClick={() => setOpen(false)}
            >
              {t('cancel')}
            </Button>
            <Button
              variant='solid'
              color='danger'
              disabled={isMutationInFlight}
              onClick={() => handleDelete({ id })}
            >
              {t('delete')}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default DeleteDaily;
