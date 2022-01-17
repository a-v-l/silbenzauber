import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const vokale: string[] = ['a', 'e', 'i', 'o', 'u', 'ei'];
const umlaute: string[] = ['ä', 'ö', 'ü'];
const consonant: string[] = ['d', 'r', 'w', 'p', 's', 'l', 'm', 't', 'n', 'z', 'w', 'f', 'k', 'g', 'h', 'j'];
// const consonant: string[] = ['m', 'l', 't', 'r', 'b', 'n', 'p', 'd', 's', 'z', 'w', 'f', 'k', 'g', 'h', 'j'];

/**
 * 
 * @param level - How many consonants should be included
 * @param extended - Use umlaute as well?
 * @returns {sting} A syllable containing a consonant and a vokal or an umlaut
 */
function getRandomSyllable(level: number, extended: boolean) {
  const index_c = getRandomInt(level);
  let vokal: string[] = vokale;
  if (extended) {
    vokal = [...vokale, ...vokale, ...umlaute, ...vokale];
  }
  const index_v = getRandomInt(vokal.length);
  return consonant[index_c] + vokal[index_v];
}

/**
 * 
 * @param max - Maximum value of random number
 * @returns {number} random numer [0-max]
 */
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const level: number = 9;
const speed: number = 7;
const extended: boolean = false;
const word_length = 2;


function tick() {
  // Array of syllables
  const syllable: string[] = [];
  for (let i = 0; i < word_length; i++) {
    syllable.push(getRandomSyllable(level, extended));
  }
  // First letter uppercase
  syllable[0] = syllable[0][0].toUpperCase() + syllable[0].substring(1);
  // Wrap syllables in span elements
  const spell = syllable.map((syllable, i) => {
    let className: string = "syllable";
    if (i === 0) {
      className += ' active';
    }
    return <span className={className} key={i}>{syllable}</span>
  });
  
  const element = (
    <h1>
     {spell}
     <span>!</span>
    </h1>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

tick();
setInterval(() => tick(), (speed * 1000));



/*
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
