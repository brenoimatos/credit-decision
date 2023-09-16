import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StartNode from '../CustomNodes/StartNode'

describe('StartNode', () => {
  it('should render the word "Start"', () => {
    renderWithProviders(<StartNode />)
    expect(screen.getByText('Start')).toBeInTheDocument()
  })
})
