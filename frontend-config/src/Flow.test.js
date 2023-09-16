import React from 'react'
import { screen, act, waitFor } from '@testing-library/react'
import Flow from './Flow'
import { getPolicy } from './api/policy'
import { mockReactFlow } from './setupTests'

jest.mock('axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
  patch: jest.fn(),
}))

jest.mock('./api/policy')
describe('Flow Component', () => {
  beforeEach(() => {
    mockReactFlow()
    getPolicy.mockResolvedValue({
      success: true,
      data: { nodes: [], edges: [] },
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders Sidebar component', async () => {
    await act(async () => {
      renderWithProviders(<Flow />)
    })
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  it('renders ReactFlow component', async () => {
    await act(async () => {
      renderWithProviders(<Flow />)
    })
    expect(screen.getByTestId('rf__wrapper')).toBeInTheDocument()
  })

  it('fetches policy data on mount', async () => {
    await act(async () => {
      renderWithProviders(<Flow />)
    })

    await waitFor(() => {
      expect(getPolicy).toHaveBeenCalled()
    })
  })

  it('displays error message when API call fails', async () => {
    getPolicy.mockResolvedValue({
      success: false,
      error: 'Error: Failed to fetch policy',
    })

    await act(async () => {
      renderWithProviders(<Flow />)
    })

    await waitFor(() => {
      expect(
        screen.getByText('Error: Failed to fetch policy')
      ).toBeInTheDocument()
    })
  })
})
