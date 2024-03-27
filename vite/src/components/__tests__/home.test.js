import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Home from '../Home'

test('should render home component', () => {
    render(<Home/>)
    const homeElement = screen.getByTestId('home-1');
    expect(homeElement).toBeInTheDocument();
})

test('matches snapshot', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
})
