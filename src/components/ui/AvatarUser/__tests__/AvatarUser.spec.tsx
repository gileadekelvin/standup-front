import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import AvatarUser from '..';

describe('Test AvatarUser component', () => {
  it('should render component', () => {
    const { container } = render(<AvatarUser name='John' />);

    expect(container).toMatchSnapshot();
  });
});
