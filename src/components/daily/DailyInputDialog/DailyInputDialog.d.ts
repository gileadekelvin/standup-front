import { ModalProps } from '@mui/material';

export type DailyInputDialogProps = {
  handleClose: ModalProps['onClose'];
  handleCancel: () => void;
  open: boolean;
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
