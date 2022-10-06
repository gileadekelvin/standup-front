import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import '@testing-library/jest-dom';

import TaskInput from '..';
import { FormValues } from '../../DailyInputDialog';

describe('Test TaskInput component', () => {
  const TaskInputTest = () => {
    const { control } = useForm<FormValues>({
      defaultValues: {
        yesterday: [{ text: '' }],
      },
    });
    return <TaskInput control={control} title='yesterday' color='red' />;
  };

  it('should render component', async () => {
    render(<TaskInputTest />);

    const title = screen.getByText('daily.yesterday');
    expect(title).toBeInTheDocument();

    const addButton = screen.getByText('daily.addTask');
    expect(addButton).toBeInTheDocument();

    const textArea = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(textArea, 'newTask');
    });

    const newTask = screen.getByText('newTask');
    expect(newTask).toBeInTheDocument();
  });
});
