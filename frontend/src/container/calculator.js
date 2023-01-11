import React, { useCallback, useEffect, useState } from 'react'
import update from 'immutability-helper'
import { evaluate, format } from 'mathjs'

import Display from '../components/Display';
import Buttons from '../components/Buttons';
import Button from '../components/Button';

import { Breadcrumb, Layout } from 'antd';

const { Content } = Layout;


const buttonList = [
  { onClick: true, onKeyPress: true, label: "C", value: "clear" },
  { onClick: true, onKeyPress: true, label: "7", value: "7" },
  { onClick: true, onKeyPress: true, label: "4", value: "4" },
  { onClick: true, onKeyPress: true, label: "1", value: "1" },
  { onClick: true, onKeyPress: true, label: "0", value: "0" },

  { onClick: true, onKeyPress: true, label: "/", value: "/" },
  { onClick: true, onKeyPress: true, label: "8", value: "8" },
  { onClick: true, onKeyPress: true, label: "5", value: "5" },
  { onClick: true, onKeyPress: true, label: "2", value: "2" },
  { onClick: true, onKeyPress: true, label: ".", value: "." },

  { onClick: true, onKeyPress: true, label: "x", value: "*" },
  { onClick: true, onKeyPress: true, label: "9", value: "9" },
  { onClick: true, onKeyPress: true, label: "6", value: "6" },
  { onClick: true, onKeyPress: true, label: "3", value: "3" },
  { label: "", value: "null" },

  { onClick: true, onKeyPress: true, label: "-", value: "-" },
  { onClick: true, onKeyPress: true, label: "+", size: "2", value: "+" },
  { onClick: true, onKeyPress: true, label: "=", size: "2", value: "equal" },
]

const allowed = [
  '1', '2', '3', '4',
  '5', '6', '7', '8',
  '9', '0', '+', '-', '*', '/', '=', '.',
  'Enter', 'equal', 'Escape', 'C',
  'Backspace'
];

const notfirst = ['+', '-', '*', '/', '=', 'Enter']

const Calculator = () => {
  const [state, setState] = useState({
    operations: []
  });

  const updateState = useCallback((update) => {
    setState(data => ({
      ...data,
      ...update,
    }))
  }, [])


  const calculateOperations = () => {
    let result = state.operations.join('')
    if (result) {
      result = evaluate(result)
      result = format(result, { precision: 14 })
      updateState({
        operations: [result],
      })
    }
  }

  const handleClick = e => {
    const value = e.target.getAttribute('data-value')

    if (!state.operations.join('').length && notfirst.includes(value)) {
      return
    }

    switch (value) {
      case 'clear':
        updateState({
          operations: [],
        })
        break
      case 'equal':
        calculateOperations()
        break
      default:
        const newOperations = update(state.operations, {
          $push: [value],
        })
        updateState({
          operations: newOperations,
        })
        break
    }
  }
  const onKeyPress = e => {
    const value = e.key;

    if (!state.operations.join('').length && notfirst.includes(value)) {
      return
    }

    if (allowed.includes(value)) {
      switch (value) {
        case 'Escape':
          updateState({
            operations: [],
          })
          break
        case 'Backspace':
          const backSpaceOperations = state.operations;
          backSpaceOperations.pop()
          updateState({
            operations: backSpaceOperations,
          })
          break
        case '=':
        case 'Enter':
          calculateOperations()
          break
        default:
          const newOperations = update(state.operations, {
            $push: [value],
          })
          updateState({
            operations: newOperations,
          })
          break
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);

    return () => document.removeEventListener("keydown", onKeyPress)
  })

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Calculator</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
        <div className="calculator" >
          <Display data={state.operations} />
          <Buttons>
            {buttonList.map((data, index) => {
              let propsButton = { label: data.label, value: data.value, size: data.size };
              if (data.onClick) {
                propsButton.onClick = handleClick
              }
              if (data.onKeyPress) {
                propsButton.onKeyPress = onKeyPress
              }
              return <Button key={index} {...propsButton} />
            })}
          </Buttons>
        </div >
      </div>
    </Content>
  );
}

export default Calculator;
