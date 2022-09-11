import { render, screen, act, fireEvent } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator, MockEnvironment } from 'relay-test-utils';
import '@testing-library/jest-dom';

import MyTeam from '..';
import { withRelayProvider } from '../../../tests/relay';

describe('Test MyTeam component', () => {
  let environment: MockEnvironment;

  beforeAll(async () => {
    environment = createMockEnvironment();
  });

  it('should render component', async () => {
    const MyTeamTestWrapped = withRelayProvider(<MyTeam />, environment);
    render(MyTeamTestWrapped);

    const loadButton = screen.getByRole('button');
    expect(loadButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(loadButton);
    });

    const customResolvers = {
      Query: () => ({
        me: {
          team: {
            dailies: {
              totalCound: 2,
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

    const user1 = screen.getByText('User1');
    expect(user1).toBeInTheDocument();

    const user2 = screen.getByText('User2');
    expect(user2).toBeInTheDocument();
  });
});
