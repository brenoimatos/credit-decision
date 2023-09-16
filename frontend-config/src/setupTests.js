// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ReactFlowProvider } from 'reactflow'

// To make sure that the tests are working, it's important that you are using
// this implementation of ResizeObserver and DOMMatrixReadOnly
// Para garantir que os testes funcionem, é importante que você esteja usando
// esta implementação de ResizeObserver e DOMMatrixReadOnly
class ResizeObserver {
  callback

  constructor(callback) {
    this.callback = callback
  }

  observe(target) {
    this.callback([{ target }], this)
  }

  unobserve() {}

  disconnect() {}
}

class DOMMatrixReadOnly {
  m22
  constructor(transform) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1]
    this.m22 = scale !== undefined ? +scale : 1
  }
}

// Execute o shim apenas uma vez quando solicitado
let init = false

export const mockReactFlow = () => {
  if (init) return
  init = true

  global.ResizeObserver = ResizeObserver

  // @ts-ignore
  global.DOMMatrixReadOnly = DOMMatrixReadOnly

  Object.defineProperties(global.HTMLElement.prototype, {
    offsetHeight: {
      get() {
        return parseFloat(this.style.height) || 1
      },
    },
    offsetWidth: {
      get() {
        return parseFloat(this.style.width) || 1
      },
    },
  })

  global.SVGElement.prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
}

global.renderWithProviders = (ui) => {
  return render(<ReactFlowProvider>{ui}</ReactFlowProvider>)
}
