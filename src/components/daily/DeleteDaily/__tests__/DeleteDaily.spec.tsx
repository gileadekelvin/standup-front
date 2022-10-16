import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { createMockEnvironment, MockEnvironment } from 'relay-test-utils';

import { withRelayProvider } from '../../../../tests/relay';
import DeleteDaily from '..';

describe('Test DeleteDaily component', () => {
  let environment: MockEnvironment;

  beforeAll(async () => {
    environment = createMockEnvironment();
  });

  it('should render component and delete daily', async () => {
    const DeleteDailyTestWrapped = withRelayProvider(<DeleteDaily id={'daily-id'} />, environment);
    render(DeleteDailyTestWrapped);

    const deleteButton = screen.getByText('delete');
    expect(deleteButton).toBeInTheDocument();

    await act(async () => {
      deleteButton.click();
    });

    const deleteConfirm = screen.getAllByText('delete');
    expect(deleteConfirm).toHaveLength(2);

    await act(async () => {
      deleteConfirm[1].click();
    });

    const operation = environment.mock.getMostRecentOperation();

    expect(operation.root.variables).toMatchObject({
      input: {
        id: 'daily-id',
      },
    });
  });
});
