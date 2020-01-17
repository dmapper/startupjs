import React from 'react'
import { View } from 'react-native'
import { observer } from 'startupjs'
import { Props } from 'components'
import * as COMPONENTS from 'ui'
import {
  useComponentName,
  useShowGrid,
  useShowSizes,
  useValidateWidth
} from 'clientHelpers'
import './index.styl'

export default observer(function PStyleguide () {
  const [componentName] = useComponentName()
  const [showGrid] = useShowGrid()
  const [showSizes] = useShowSizes()
  const [validateWidth] = useValidateWidth()
  return pug`
    View.root
      Props(
        key=componentName
        Component=COMPONENTS[componentName]
        componentName=componentName
        showSizes=showSizes
        showGrid=showGrid
        validateWidth=validateWidth
      )
  `
})