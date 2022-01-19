import React from 'react';
import ReactDOM from 'react-dom';
import Spell from './Spell'
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <>
    <div id="menu"></div>
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
