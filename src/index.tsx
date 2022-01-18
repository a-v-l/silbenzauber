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
  speed: 2,
  extended: false,
  word_length: 2
}

type SyllablProps = {
  syllablesArray: string[]
}

/**
 * 
 */
class Spell extends React.Component<SyllablProps> {
  static syllables: string[]
  static spell: JSX.Element[]

  constructor (props: SyllablProps) {
    super (props)
    Spell.syllables = props.syllablesArray
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render() {
    // First letter uppercase
    Spell.syllables[0] = Spell.syllables[0][0].toUpperCase() + Spell.syllables[0].substring(1);
    // Wrap syllables in span elements
    Spell.spell = Spell.syllables.map((syllable: string, i: number) => {
      let className: string = "syllable";
      return <span className={className} key={i}>{syllable}</span>
    });
    return (
      <h1>
        {Spell.spell}
        <span>!</span>
      </h1>
    )
  }
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
