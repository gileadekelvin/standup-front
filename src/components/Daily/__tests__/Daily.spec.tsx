import { render, screen, act } from '@testing-library/react';
import { useLazyLoadQuery, graphql } from 'react-relay';
import { createMockEnvironment, MockPayloadGenerator, MockEnvironment } from 'relay-test-utils';
import '@testing-library/jest-dom';

import Daily from '..';
import { DailyTestQuery } from '../../../../__generated__/DailyTestQuery.graphql';
import { withRelayProvider } from '../../../tests/relay';

describe('Test Daily component', () => {
  let environment: MockEnvironment;

  beforeAll(async () => {
    environment = createMockEnvironment();
  });

  it('should render component', async () => {
    const DailyTest = () => {
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
      return data.myData && <Daily data={data.myData} />;
    };

    const DailyTestWrapped = withRelayProvider(<DailyTest />, environment);
    render(DailyTestWrapped);

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

    const user = screen.getByText('Gileade Kelvin');
    expect(user).toBeInTheDocument();

    const date = screen.getByText('2022-07-27');
    expect(date).toBeInTheDocument();

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
  });
});
