import React, { useCallback, useEffect, useState } from 'react'
import update from 'immutability-helper'
import { evaluate } from 'mathjs'

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
      updateState({
        operations: [result],
        showButtonWord: true,
        wordsText: ''
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
          showButtonWord: false
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
          showButtonWord: false
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
            showButtonWord: false
          })
          break
        case 'Backspace':
          const backSpaceOperations = state.operations;
          backSpaceOperations.pop()
          updateState({
            operations: backSpaceOperations,
            showButtonWord: false
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
            showButtonWord: false
          })
          break
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);

    return () => document.removeEventListener("keydown", onKeyPress)
  })

  const numberToWordsIndonesia = (n, custom_join_character) => {
    var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

    var and = custom_join_character || '';

    /* Apakah angka nol? */
    if (parseInt(string) === 0) {
      return 'nol';
    }
    /* Susunan unit sebagai kata */
    units = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];

    /* Susunan puluhan sebagai kata */
    tens = ['', '', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh', 'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'];

    /* Susunan skala sebagai kata */
    scales = ['', 'ribuan', 'juta', 'miliar', 'triliun', 'kuadriliun', 'kuintiliun', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

    /* Pisahkan argumen pengguna menjadi 3 digit potongan dari kanan ke kiri */
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Periksa apakah fungsi memiliki kata skala yang cukup untuk dapat merangkai argumen pengguna */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return '';
    }

    /* Merangkai setiap bilangan bulat di setiap potongan */
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);
      if (chunk) {
        /* Membagi potongan menjadi array bilangan bulat individual */
        ints = chunks[i].split('').reverse().map(parseFloat);
        /* Jika bilangan bulat puluhan adalah 1, yaitu 10, maka tambahkan 10 ke bilangan bulat satuan */
        if (ints[1] === 1) {
          ints[0] += 10;
        }
        /* Tambahkan kata skala jika potongan bukan nol dan item array ada */
        if ((word = scales[i])) {
          words.push(word);
        }
        /* Tambahkan kata satuan jika item array ada */
        if ((word = units[ints[0]])) {
          words.push(word);
        }
        /* Tambahkan puluhan kata jika item array ada */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }
        /* Tambahkan string '' setelah satuan atau bilangan bulat puluhan jika: */
        if (ints[0] || ints[1]) {
          /* Chunk memiliki ratusan integer atau chunk adalah yang pertama dari beberapa chunk */
          if ((ints[2] || !i) && chunksLen) {
            words.push(and);
          }
        }
        /* Tambahkan ratusan kata jika item array ada */
        if ((word = units[ints[2]])) {
          words.push(word + ' ratus');
        }
      }
    }
    return words.reverse().join(' ');
  }

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
        {state.showButtonWord && <div style={{ marginTop: 20 }}>
          <div style={{ padding: '10px 0', fontSize: 23, color: 'rgba(0, 0, 0, 0.5)' }}>{numberToWordsIndonesia(state.operations.join(''))}</div>
        </div>}
      </div>
    </Content>
  );
}

export default Calculator;
