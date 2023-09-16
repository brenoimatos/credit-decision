import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DecisionNode from '../CustomNodes/DecisionNode'

describe('DecisionNode', () => {
  const mockData = {
    id: '1',
    type: 'decision',
    data: { label: 'Test Decision Node', edges: [] },
  }

  it('should render options correctly', () => {
    renderWithProviders(<DecisionNode id={mockData.id} data={mockData.data} />)
    const expectedOptions = ['Age', 'Income', '=', '>', '>=', '<', '<=']

    expectedOptions.forEach((optionText) => {
      expect(screen.getByText(optionText)).toBeInTheDocument()
    })
  })
})
