import React from 'react'
import Config from './Config'
import './Spell.css'

type Char = {
  [index: string]: boolean
}

let vokale = filterConfig(Config.vokale)! as string[]
let consonants = filterConfig(Config.consonant)! as string[]
let umlaute = filterConfig(Config.umlaute)! as string[]

function filterConfig(config: Char) {
  return Object.keys(config).map((x) => {
    return config[x] ? x : false
  }).filter((x) => x) as string[]
}

/**
 * 
 * @returns {sting} A syllable containing a consonant and a vokal or an umlaut
 */
function getRandomSyllable() {
  const index_c = getRandomInt(consonants.length)
  let vokal: string[] = vokale
  if (umlaute.length >= 1) {
    vokal = [...vokal, ...vokal, ...umlaute, ...vokal]
  }
  const index_v = getRandomInt(vokal.length)
  return consonants[index_c] + vokal[index_v]
}

/**
 * 
 * @param max - Maximum value of random number
 * @returns {number} random numer [0-max]
 */
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

/**
 * 
 * @param word_length - How many syllables should the word contain
 * @returns {array} Array of syllables. The first letter of the first array is uppercase.
 */
function getWordSyllables(word_length: number) {
  // Array of syllables
  let syllables: string[] = []
  for (let i = 0; i < word_length; i++) {
    syllables.push(getRandomSyllable())
  }
  // First letter uppercase
  syllables[0] = syllables[0][0].toUpperCase() + syllables[0].substring(1)

  return syllables
}

type SyllablProps = {}
type SyllablState = {
  syllables: string[]
}

/**
 * 
 */
class Spell extends React.Component<SyllablProps, SyllablState> {
  spell: JSX.Element[] = []
  timerID: any
  fontsize: React.CSSProperties = { 'fontSize': (30 / ((Config.word_length / 2) + 0.5)) + 'vw' } // word_length 1=>30vw 2=>20vw 3=15vw 4=11vw

  constructor (props: SyllablProps) {
    super (props)
    this.state = {
      syllables: getWordSyllables(Config.word_length)
    }
  }

  componentDidMount () {
    document.addEventListener("keydown", (e) => {
      this.newWord(e)
    }, false)
    document.getElementById('spell')!.addEventListener("mousedown", (e) => {
      this.newWord(e)
    }, false)
  }

  componentWillUnmount () {
  }

  newWord(e: KeyboardEvent | MouseEvent) {
    if (e.type === 'mousedown' || (e as KeyboardEvent).key === ' ') {
      e.preventDefault()
      this.setState({
        syllables: getWordSyllables(Config.word_length)
      })
    }
  }

  render () {
    // Wrap syllables in span elements
    this.spell = this.state.syllables.map((syllable: string, i: number) => {
      let className: string = "syllable"
      return <span className={className} key={i}>{syllable}</span>
    })
    return (
      <div id="spell">
        <h1 style={this.fontsize}>
          {this.spell}
          <span>!</span>
        </h1>
      </div>
    )
  }
}

export default Spell
