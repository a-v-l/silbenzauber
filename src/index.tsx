import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const vokale: string[] = ['a', 'e', 'i', 'o', 'u', 'ei'];
const umlaute: string[] = ['ä', 'ö', 'ü'];
const consonant: string[] = ['d', 'r', 'w', 'p', 's', 'l', 'm', 't', 'n', 'z', 'w', 'f', 'k', 'g', 'h', 'j'];

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

const config: { level: number; speed: number; extended: boolean; word_length: number } = {
  level: 9,
  speed: 7,
  extended: false,
  word_length: 2
}

/**
 * 
 */
function Spell(props: any) {
  // let syllables: string[] = props.syllablesArray;

  let syllables: string[] = props.syllablesArray;
  
  // First letter uppercase
  syllables[0] = syllables[0][0].toUpperCase() + syllables[0].substring(1);
  // Wrap syllables in span elements
  const spell = syllables.map((syllable: string, i: number) => {
    let className: string = "syllable";
    return <span className={className} key={i}>{syllable}</span>
  });

  return (
    <h1>
      {spell}
      <span>!</span>
    </h1>
  )
}

function tick() {
  // Array of syllables
  const syllable: string[] = [];
  for (let i = 0; i < config.word_length; i++) {
    syllable.push(getRandomSyllable(config.level, config.extended));
  }
  
  ReactDOM.render(
    <Spell syllablesArray={syllable} />,
    document.getElementById('root')
  );
}

tick();
setInterval(() => tick(), (config.speed * 1000));
