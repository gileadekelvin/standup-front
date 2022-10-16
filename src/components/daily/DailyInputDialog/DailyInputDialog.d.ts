import { ModalProps } from '@mui/joy';

import { CreateDailyInput } from '../../../../__generated__/CreateDailyMutation.graphql';

export type DailyInputDialogProps = {
  handleClose: ModalProps['onClose'];
  handleCancel: () => void;
  handleSave: (input: CreateDailyInput) => void;
  open: boolean;
  loading?: boolean;
};

export type FormValues = {
  yesterday: {
    text: string;
  }[];
  today: {
    text: string;
  }[];
  blocks: {
    text: string;
  }[];
};
