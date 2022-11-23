
import React from 'react'
import { render } from 'react-dom'

import App from '../react/components/App'
import RedBox from 'redbox-react'
import { Provider } from 'react-redux'
import store from '../react/src/app/store'

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')

  if (reactElement) {
    if (window.railsEnv && window.railsEnv === 'development') {
      try {
        render(<Provider store={store}><App /></Provider>, reactElement)
      } catch (e) {
        render(<RedBox error={e} />, reactElement)
      }
    }
    else {
      render(<App />, reactElement)
    }
  }
})