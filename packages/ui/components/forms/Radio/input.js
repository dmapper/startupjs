import React, { useState, useRef } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import { observer, useDidUpdate } from 'startupjs'
import propTypes from 'prop-types'
import SimpleAnimation from '../SimpleAnimation'
import Div from '../../Div'
import Span from '../../Span'
import './index.styl'

const ANIMATION_TIMING = 120

// 0.01 because on android animations does not work with value 0
const MIN_SCALE_RATIO = 0.01
const MAX_SCALE_RATIO = 1

const Input = function ({
  children,
  color,
  textColor,
  value,
  label,
  checked,
  onPress,
  ...props
}) {
  const [checkedSize] = useState(new Animated.Value(checked ? 1 : MIN_SCALE_RATIO))

  const animationRef = useRef()
  const setChecked = () => {
    animationRef.current.animate()
    onPress && onPress(value)
  }

  useDidUpdate(() => {
    if (checked) {
      Animated.timing(
        checkedSize,
        {
          toValue: MAX_SCALE_RATIO,
          duration: ANIMATION_TIMING,
          useNativeDriver: true
        }
      ).start()
    } else {
      Animated.timing(
        checkedSize,
        {
          toValue: MIN_SCALE_RATIO,
          duration: ANIMATION_TIMING,
          useNativeDriver: true
        }
      ).start(() => {
        checkedSize.setValue(MIN_SCALE_RATIO)
      })
    }
  }, [checked])

  return pug`
    Div.root(
      interactive=false
      onPress=setChecked
    )
      SimpleAnimation(
        forwardedRef=animationRef
        color=color
      )
        SimpleAnimation(
          forwardedRef=animationRef
          color=color
        )
          TouchableOpacity.circle(
            style={borderColor: color}
            activeOpacity=1
            onMouseEnter=() => animationRef.current.animate({ minOpacity: 0.05, minScale: 1 })
            onPress=setChecked
          )
            Animated.View.checked(
              style={
                backgroundColor: color,
                transform: [{
                  scale: checkedSize
                }]
              }
            )
      Span.label(style={color: textColor})= label
  `
}

Input.propType = {
  checked: propTypes.bool
}

export default observer(Input)
