import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import About from '../About'

test('should render about component', () => {
    render(<About />)
    const homeElement = screen.getByTestId('about-1');
    expect(homeElement).toBeInTheDocument();
})

test('matches snapshot', () => {
    const tree = renderer.create(<About />).toJSON();
    expect(tree).toMatchSnapshot();
})
