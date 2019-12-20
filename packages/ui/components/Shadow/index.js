import React from 'react'
import Div from '../Div'
import { observer } from 'startupjs'
import './index.styl'

const SHADOWS = {
  s: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,

    elevation: 3
  },
  m: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,

    elevation: 6
  },
  l: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.15,
    shadowRadius: 8.27,

    elevation: 12
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,

    elevation: 18
  }
}

export default observer(function Shadow ({
  style,
  children,
  variant = 's' // s, m, l, xl
}) {
  return pug`
    Div.root(
      ...SHADOWS[variant]
      style=[style]
      styleName=[variant]
    )
      = children

  `
})