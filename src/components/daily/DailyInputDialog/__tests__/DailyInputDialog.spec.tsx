import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DailyInputDialog from '..';

describe('Test DailyInputDialog component', () => {
  const handleSave = jest.fn();

  it('should render component', async () => {
    render(
      <DailyInputDialog
        open
        handleCancel={jest.fn()}
        handleClose={jest.fn()}
        handleSave={handleSave}
      />,
    );

    const title = screen.getByText('daily.create.title');
    expect(title).toBeInTheDocument();

    const yesterday = screen.getByText('daily.yesterday');
    expect(yesterday).toBeInTheDocument();

    const today = screen.getByText('daily.today');
    expect(today).toBeInTheDocument();

    const blocks = screen.getByText('daily.blocks');
    expect(blocks).toBeInTheDocument();

    const cancel = screen.getByText('cancel');
    expect(cancel).toBeInTheDocument();

    const save = screen.getByText('save');
    expect(save).toBeInTheDocument();

    const textAreas = screen.getAllByRole('textbox');
    expect(textAreas).toHaveLength(3);

    await waitFor(() => userEvent.type(textAreas[0], 'newTaskYesterday'));
    await waitFor(() => userEvent.type(textAreas[1], 'newTaskToday'));
    await waitFor(() => userEvent.type(textAreas[2], 'newTaskBlocks'));

    await act(async () => {
      save.click();
    });

    expect(handleSave).toHaveBeenNthCalledWith(1, {
      blocks: [{ text: 'newTaskBlocks' }],
      today: [{ text: 'newTaskToday' }],
      yesterday: [{ text: 'newTaskYesterday' }],
    });
  });
});
