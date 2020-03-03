import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef
} from 'react'
import { View, Animated } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'

const SCALE_TIMING = 280
const FADE_TIMING = 80
// 0.01 because on android animations does not work with value 0
const MIN_SCALE_RATIO = 0.01
const MAX_SCALE_RATIO = 1
const DEFAULT_BG_OPACITY = 0.25

function Animation (props, ref) {
  const animationRef = useRef()
  const [scaleAnimation] = useState(new Animated.Value(MIN_SCALE_RATIO))
  const [opacityAnimation] = useState(new Animated.Value(DEFAULT_BG_OPACITY))
  useImperativeHandle(props.forwardedRef, () => ({
    animate: (props = {}) => {
      const {
        type = 'timing',
        minScale,
        maxScale,
        minOpacity
      } = props

      const toScale = typeof maxScale === 'undefined'
        ? MAX_SCALE_RATIO
        : maxScale
      const toOpacity = typeof minOpacity === 'undefined'
        ? DEFAULT_BG_OPACITY
        : minOpacity

      Animated[type](
        scaleAnimation,
        {
          toValue: toScale,
          duration: SCALE_TIMING
        }
      ).start(() => {
        Animated.timing(
          opacityAnimation,
          {
            toValue: toOpacity,
            duration: FADE_TIMING
          }
        ).start(() => {
          scaleAnimation.setValue(minScale || MIN_SCALE_RATIO)
          opacityAnimation.setValue(toOpacity)
        })
      })
    }
  }))

  return pug`
    View.root(
      ref=animationRef
      ...props
    )
      Animated.View.background(
        style={
          backgroundColor: props.color,
          opacity: opacityAnimation,
          transform: [{
            scale: scaleAnimation
          }]
        }
      )
      View.content
        = props.children
  `
}

const SimpleAnimation = forwardRef(observer(Animation))

export default SimpleAnimation
