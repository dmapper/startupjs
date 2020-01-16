import React from 'react'
import { Text, View } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'
import GridVisualizer from './GridVisualizer'

const DEFAULT_WRAP_CHILDREN = false

export default observer(function Renderer ({
  Component,
  wrapChildren = DEFAULT_WRAP_CHILDREN,
  props: {
    children,
    ...props
  },
  showGrid = true,
  validateWidth,
  validateHeight,
  allowHalfUnit,
  style
}) {
  let Wrapper = showGrid ? GridVisualizer : View
  return pug`
    Wrapper(
      style=style
      validateWidth=validateWidth
      validateHeight=validateHeight
      allowHalfUnit=allowHalfUnit
    )
      Component(...props)
        if children
          if wrapChildren && typeof children === 'string'
            Text= children
          else
            | #{children}
  `
})
