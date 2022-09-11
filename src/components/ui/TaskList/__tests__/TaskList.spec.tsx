import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import TaskList from '..';

describe('Test TaskList component', () => {
  it('should render component', () => {
    render(
      <TaskList color='red' title='title-mock' tasks={[{ text: 'text-1' }, { text: 'text-2' }]} />,
    );

    const title = screen.getByText('title-mock');
    expect(title).toBeInTheDocument();

    const text1 = screen.getByText('text-1');
    expect(text1).toBeInTheDocument();

    const text2 = screen.getByText('text-2');
    expect(text2).toBeInTheDocument();
  });
});
