import React from 'react'
import { observer } from 'startupjs'
import { Layout } from 'ui'
import Sidebar from './Sidebar'
import { MenuProvider } from '@startupjs/ui/components/Dropdown'
import './index.styl'

export default observer(function StyleguideLayout ({ children }) {
  return pug`
    Layout
      Sidebar
        MenuProvider
          = children
  `
})
