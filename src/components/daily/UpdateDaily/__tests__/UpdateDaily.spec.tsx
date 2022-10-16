import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockEnvironment, MockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { useLazyLoadQuery, graphql } from 'react-relay';

import { withRelayProvider } from '../../../../tests/relay';
import UpdateDaily from '..';
import { DailyTestQuery } from '../../../../../__generated__/DailyTestQuery.graphql';

describe('Test UpdateDaily component', () => {
  let environment: MockEnvironment;

  beforeAll(async () => {
    environment = createMockEnvironment();
  });

  it('should render component and update daily', async () => {
    const UpdateDailyTest = () => {
      const data = useLazyLoadQuery<DailyTestQuery>(
        graphql`
          query DailyTestQuery @relay_test_operation {
            myData: node(id: "test-id") {
              ...DailyFragment
            }
          }
        `,
        {},
      );
      return data.myData && <UpdateDaily id='test-id' daily={data.myData} />;
    };

    const UpdateDailyTestWrapped = withRelayProvider(<UpdateDailyTest />, environment);
    render(UpdateDailyTestWrapped);

    const customResolvers = {
      Daily: () => ({
        id: 'id-mock',
        author: { name: 'Gileade Kelvin' },
        yesterday: [{ text: 'text-1' }],
        today: [{ text: 'text-2' }],
        blocks: [{ text: 'text-3' }, { text: 'text-4' }],
        createdAt: '2022-07-27T18:48:52.113Z',
      }),
    };

    await act(async () => {
      environment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, customResolvers),
      );
    });

    const edit = screen.getByText('edit');
    expect(edit).toBeInTheDocument();

    await act(async () => {
      edit.click();
    });

    const updateTitle = screen.getByText('daily.update.title');
    expect(updateTitle).toBeInTheDocument();

    const yesterday = screen.getByText('daily.yesterday');
    expect(yesterday).toBeInTheDocument();

    const yesterdayText = screen.getByText('text-1');
    expect(yesterdayText).toBeInTheDocument();

    const today = screen.getByText('daily.today');
    expect(today).toBeInTheDocument();

    const todayText = screen.getByText('text-2');
    expect(todayText).toBeInTheDocument();

    const blocks = screen.getByText('daily.blocks');
    expect(blocks).toBeInTheDocument();

    const blocksText = screen.getByText('text-3');
    expect(blocksText).toBeInTheDocument();

    const blocksOtherText = screen.getByText('text-4');
    expect(blocksOtherText).toBeInTheDocument();

    const save = screen.getByText('save');
    expect(save).toBeInTheDocument();

    await waitFor(() => userEvent.type(yesterdayText, 'newTaskYesterday'));
    await waitFor(() => userEvent.type(todayText, 'newTaskToday'));

    await act(async () => {
      save.click();
    });

    const operation = environment.mock.getMostRecentOperation();

    expect(operation.root.variables).toMatchObject({
      input: {
        yesterday: [{ text: 'text-1newTaskYesterday' }],
        today: [{ text: 'text-2newTaskToday' }],
        blocks: [
          {
            text: 'text-3',
          },
          {
            text: 'text-4',
          },
        ],
      },
    });
  });
});
