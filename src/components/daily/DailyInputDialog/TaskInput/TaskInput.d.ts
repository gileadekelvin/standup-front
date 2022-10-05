import { Control } from 'react-hook-form';

import { FormValues } from '../DailyInputDialog';

export type TaskInputProps = {
  title: 'yesterday' | 'today' | 'blocks';
  color: string;
  control: Control<FormValues, any>;
};
