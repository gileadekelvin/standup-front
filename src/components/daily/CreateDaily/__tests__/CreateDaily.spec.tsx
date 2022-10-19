import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLazyLoadQuery, graphql } from 'react-relay';
import { createMockEnvironment, MockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

import { withRelayProvider } from '../../../../tests/relay';
import CreateDaily from '..';
import { CreateDailyTestQuery } from '../../../../../__generated__/CreateDailyTestQuery.graphql';

describe('Test CreateDaily component', () => {
  let environment: MockEnvironment;

  beforeAll(async () => {
    environment = createMockEnvironment();
  });

  it('should render component and create daily', async () => {
    const CreateDailyTest = () => {
      const data = useLazyLoadQuery<CreateDailyTestQuery>(
        graphql`
          query CreateDailyTestQuery($first: Int = 5, $after: String = null) {
            me {
              team {
                ...DailiesFragment
              }
            }
          }
        `,
        {},
      );
      return data.me?.team ? <CreateDaily data={data.me?.team} /> : null;
    };

    const CreateDailyTestWrapped = withRelayProvider(<CreateDailyTest />, environment);
    render(CreateDailyTestWrapped);

    const customResolvers = {
      Query: () => ({
        me: {
          team: {
            dailies: {
              totalCount: 2,
              edges: [
                {
                  node: {
                    id: 'id-mock-1',
                    author: { name: 'User1' },
                    yesterday: [{ text: 'text-1' }],
                    today: null,
                    blocks: null,
                    createdAt: '2022-07-27T18:48:52.113Z',
                  },
                },
                {
                  node: {
                    id: 'id-mock-2',
                    author: { name: 'User2' },
                    yesterday: [{ text: 'text-1' }],
                    today: null,
                    blocks: null,
                    createdAt: '2022-07-27T18:48:52.113Z',
                  },
                },
              ],
            },
          },
        },
      }),
    };

    await act(async () => {
      environment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, customResolvers),
      );
    });

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
