import React from 'react';
import ReactDOM from 'react-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const vokale: string[] = ['a', 'e', 'i', 'o', 'u', 'ei'];
const umlaute: string[] = ['ä', 'ö', 'ü'];
const consonant: string[] = ['d', 'r', 'w', 'p', 's', 'l', 'm', 't', 'n', 'z', 'w', 'f', 'k', 'g', 'h', 'j'];

/**
 * 
 * @param level - How many different consonants should be included
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

/**
 * 
 * @param word_length - How many syllables should the word contain
 * @param level - How many different consonants should be included
 * @param extended - Use umlaute as well?
 * @returns {array} Array of syllables. The first letter of the first array is uppercase.
 */
function getWordSyllables(word_length: number, level: number, extended: boolean) {
  // Array of syllables
  let syllables: string[] = [];
  for (let i = 0; i < word_length; i++) {
    syllables.push(getRandomSyllable(level, extended));
  }
  // First letter uppercase
  syllables[0] = syllables[0][0].toUpperCase() + syllables[0].substring(1)

  return syllables
}

let config: { level: number; speed: number; extended: boolean; word_length: number } = {
  level: 9,
  speed: 5,
  extended: false,
  word_length: 2
}

type SyllablProps = {}
type SyllablState = {
  syllables: string[]
};

/**
 * 
 */
class Spell extends React.Component<SyllablProps, SyllablState> {
  spell: JSX.Element[] = []
  timerID: any

  constructor (props: SyllablProps) {
    super (props)
    this.state = {
      syllables: getWordSyllables(config.word_length, config.level, config.extended)
    }
  }

  componentDidMount () {
    document.addEventListener("keydown", (e) => {
      this.newWord(e)
    }, false);
    document.getElementById('root')!.addEventListener("mousedown", (e) => {
      this.newWord(e)
    }, false);
  }

  componentWillUnmount () {
  }

  newWord(e: KeyboardEvent | MouseEvent) {
    if (e.type === 'mousedown' || (e as KeyboardEvent).key === ' ') {
      e.preventDefault()
      this.setState({
        syllables: getWordSyllables(config.word_length, config.level, config.extended)
      });
    }
  }

  render () {
    // Wrap syllables in span elements
    this.spell = this.state.syllables.map((syllable: string, i: number) => {
      let className: string = "syllable";
      return <span className={className} key={i}>{syllable}</span>
    });
    return (
      <h1>
        {this.spell}
        <span>!</span>
      </h1>
    )
  }
}

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
