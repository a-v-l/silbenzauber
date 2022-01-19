import React from 'react';
import ReactDOM from 'react-dom';
import Spell from './Spell'
import Menu from './Menu'
import './index.css';

ReactDOM.render(
  <>
    <Menu />
    <Spell />
  </>,
  document.getElementById('root')
);

// document.querySelectorAll('#menu button').forEach((button) => {
//   button.addEventListener('click', () => {
//     const target = button.getAttribute('data-target')
//     document.querySelector('aside')?.classList.remove('active', 'config', 'info')
//     document.querySelector('aside')?.classList.add('active', target!)
//   });
// })
