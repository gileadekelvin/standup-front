import { Control, UseFieldArrayAppend } from 'react-hook-form';

import { FormValues } from '../DailyInputDialog';

export type TaskInputProps = {
  title: 'yesterday' | 'today' | 'blocks';
  color: string;
  fields: Record<'id', string>[];
  control: Control<FormValues, any>;
  append: UseFieldArrayAppend<FormValues, any>;
};
