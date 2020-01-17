import React, { useMemo } from 'react'
import { observer } from 'startupjs'
import parsePropTypes from 'parse-prop-types'
import { TextInput, Text, Picker, Switch } from 'react-native'
import Table from './Table'
import Tbody from './Tbody'
import Thead from './Thead'
import Tr from './Tr'
import Td from './Td'
import { Span } from '@startupjs/ui'
import './index.styl'

const PICKER_EMPTY_LABEL = '-\u00A0\u00A0\u00A0\u00A0\u00A0'

export default observer(function Constructor ({ Component, $props, style }) {
  let entries = useMemo(() => {
    let res = parseEntries(Object.entries(parsePropTypes(Component)))
    for (const prop of res) {
      if (prop.defaultValue) {
        $props.set(prop.name, prop.defaultValue)
      }
    }
    return res
  }, [Component])

  return pug`
    Table.table(style=style)
      Thead.thead
        Tr
          Td: Text.header PROP
          Td: Text.header TYPE
          Td: Text.header DEFAULT
          Td: Text.header VALUE
      Tbody
        each entry, index in entries
          - const { name, type, defaultValue, possibleValues } = entry
          Tr(key=index)
            Td: Span(bold).name= name
            Td
              if type === 'oneOf'
                Span.possibleValue
                  - let first = true
                  each value, index in possibleValues
                    React.Fragment(key=index)
                      if !first
                        Span(bold) #{' | '}
                      Span.value= JSON.stringify(value)
                      - first = false
              else
                Span.type= type
            Td: Span.value= JSON.stringify(defaultValue)
            Td
              if type === 'string'
                TextInput.input(
                  value=$props.get(name) || ''
                  onChangeText=value => $props.set(name, value)
                )
              else if type === 'number'
                - const aValue = parseFloat($props.get(name))
                TextInput.input(
                  value='' + (isNaN(aValue) ? '' : aValue)
                  onChangeText=value => {
                    value = parseFloat(value)
                    if (isNaN(value)) value = undefined
                    $props.set(name, value)
                  }
                )
              else if type === 'node'
                TextInput.input(
                  value=$props.get(name) || ''
                  onChangeText=value => $props.set(name, value)
                )
              else if type === 'oneOf'
                Picker(
                  selectedValue=$props.get(name)
                  onValueChange=value => {
                    if (value === PICKER_EMPTY_LABEL) {
                      $props.del(name)
                    } else {
                      $props.set(name, value)
                    }
                  }
                )
                  Picker.Item(key=-1 label=PICKER_EMPTY_LABEL value=undefined)
                  each value, index in possibleValues
                    Picker.Item(key=index label=value value=value)
              else if type === 'bool'
                Switch(
                  value=$props.get(name)
                  onValueChange=value => $props.set(name, value)
                )
              else
                Span UNSUPPORTED: '#{type}'
  `
})

function parseEntries (entries) {
  return entries.map(entry => {
    let meta = entry[1]
    return {
      name: entry[0],
      type: meta.type.name,
      defaultValue: meta.defaultValue && meta.defaultValue.value,
      possibleValues: meta.type.value
    }
  })
}