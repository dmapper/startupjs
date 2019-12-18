import React from 'react'
import { observer } from 'startupjs'
import { View } from 'react-native'
import { Chips } from '@startupjs/ui'
import './index.styl'

export default observer(function PComponent () {
  return pug`
    View.root
      Chips(
        title=123
        iconLeft={name: '2'}
      )
  `
})
