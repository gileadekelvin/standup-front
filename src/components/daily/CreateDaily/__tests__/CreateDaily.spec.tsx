import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockEnvironment, MockEnvironment } from 'relay-test-utils';

import { withRelayProvider } from '../../../../tests/relay';
import CreateDaily from '..';

describe('Test CreateDaily component', () => {
  let environment: MockEnvironment;

  beforeAll(async () => {
    environment = createMockEnvironment();
  });

  it('should render component and create daily', async () => {
    const CreateDailyTestWrapped = withRelayProvider(<CreateDaily />, environment);
    render(CreateDailyTestWrapped);

    const createButton = screen.getByText('daily.create.title');
    expect(createButton).toBeInTheDocument();

    await act(async () => {
      createButton.click();
    });

    const save = screen.getByText('save');
    expect(save).toBeInTheDocument();

    const textAreas = screen.getAllByRole('textbox');
    expect(textAreas).toHaveLength(3);

    await waitFor(() => userEvent.type(textAreas[0], 'newTaskYesterday'));
    await waitFor(() => userEvent.type(textAreas[1], 'newTaskToday'));

    await act(async () => {
      save.click();
    });

    const operation = environment.mock.getMostRecentOperation();

    expect(operation.root.variables).toMatchObject({
      input: {
        yesterday: [{ text: 'newTaskYesterday' }],
        today: [{ text: 'newTaskToday' }],
        blocks: [],
      },
    });
  });
});
