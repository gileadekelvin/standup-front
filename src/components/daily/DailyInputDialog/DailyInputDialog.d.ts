import { ModalProps } from '@mui/joy';

export type DailyInputDialogProps = {
  handleClose: ModalProps['onClose'];
  handleCancel: () => void;
  handleSave: (input: FormValues) => void;
  open: boolean;
  loading?: boolean;
  title?: string;
  initialValues?: FormValues;
};

export type FormValues = {
  yesterday:
    | {
        text: string;
      }[]
    | null
    | undefined;
  today:
    | {
        text: string;
      }[]
    | null
    | undefined;
  blocks:
    | {
        text: string;
      }[]
    | null
    | undefined;
};
