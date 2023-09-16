import React from 'react'
import { screen } from '@testing-library/react'
import EndNode from '../CustomNodes/EndNode'

describe('EndNode', () => {
  const mockData = {
    id: '1',
    type: 'end',
    data: { label: 'Test End Node', edges: [], selected: true },
  }

  it('should render select options correctly', () => {
    renderWithProviders(<EndNode id={mockData.id} data={mockData.data} />)
    const expectedOptions = ['True', 'False']

    expectedOptions.forEach((optionText) => {
      expect(screen.getByText(optionText)).toBeInTheDocument()
    })
  })

  it('should render the word "End"', () => {
    renderWithProviders(<EndNode id={mockData.id} data={mockData.data} />)
    expect(screen.getByText('End')).toBeInTheDocument()
  })
})
