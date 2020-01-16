import React, { useState } from 'react'
import { observer, useDidUpdate } from 'startupjs'
import { View, Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'
import Span from '../Span'
import './index.styl'
const AnimatedView = Animated.View

function Progress ({
  value,
  label,
  variant
}) {
  const [progress] = useState(new Animated.Value(value))

  // TODO: We can calculate duration using durationOfFullProgress / newValue - prevValue
  useDidUpdate(() => {
    Animated.timing(
      progress,
      {
        toValue: value,
        duration: 300,
        easing: Easing.linear
      }
    ).start()
  }, [value])

  return pug`
    View
      View.progress
        AnimatedView.filler(
          style={
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '1%']
            })
          }
        )
      if variant === 'full'
        Span(variant='caption' description)
          = label || (value < 100 ? value + '% ...' : 'Loading Complete')
  `
}

Progress.defaultProps = {
  value: 0,
  variant: 'full'
}

Progress.PropTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['full', 'compact'])
}

export default observer(Progress)