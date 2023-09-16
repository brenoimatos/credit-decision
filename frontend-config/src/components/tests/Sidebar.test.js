import { render, fireEvent, screen, act } from '@testing-library/react'
import Sidebar from '../Sidebar'
import { patchPolicy } from '../../api/policy'

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  patch: jest.fn(),
}))

jest.mock('../../api/policy')

describe('Sidebar Component', () => {
  it('renders correctly', () => {
    render(<Sidebar nodes={[]} edges={[]} />)
    expect(
      screen.getByText('You can drag these nodes to the pane on the right.')
    ).toBeInTheDocument()
  })

  it('renders draggable nodes', () => {
    render(<Sidebar nodes={[]} edges={[]} />)
    expect(screen.getByText('Start Node')).toBeInTheDocument()
    expect(screen.getByText('Decision Node')).toBeInTheDocument()
    expect(screen.getByText('End Node')).toBeInTheDocument()
  })

  it('should trigger the save button and display success message', async () => {
    patchPolicy.mockResolvedValue({ success: true })

    render(<Sidebar nodes={[]} edges={[]} />)
    const saveButton = screen.getByText('Save Policy')

    await act(async () => {
      fireEvent.click(saveButton)
    })

    const messageElement = await screen.findByText('Policy successfully saved!')
    expect(messageElement).toBeInTheDocument()
  })

  it('should display error message', async () => {
    patchPolicy.mockResolvedValue({
      success: false,
      error: 'Error: Unable to patch policy.',
    })

    render(<Sidebar nodes={[]} edges={[]} />)
    const saveButton = screen.getByText('Save Policy')

    fireEvent.click(saveButton)

    const messageElement = await screen.findByText(
      'Error: Unable to patch policy.'
    )
    expect(messageElement).toBeInTheDocument()
  })
})
