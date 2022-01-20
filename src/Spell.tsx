import React from 'react'
import './Spell.css'

type Char = {
  [index: string]: boolean
}
type SpellProps = {
  config: {
    word_length: number,
    vokale: Char,
    umlaute: Char,
    consonant: Char
  }
}
type SpellState = {
  syllables: string[]
}

/**
 * 
 */
class Spell extends React.Component<SpellProps, SpellState> {
  spell: JSX.Element[] = []
  timerID: any
  fontsize: React.CSSProperties = { 'fontSize': (30 / ((this.props.config.word_length / 2) + 0.5)) + 'vw' } // word_length 1=>30vw 2=>20vw 3=15vw 4=11vw

  constructor (props: SpellProps) {
    super (props)
    this.state = {
      syllables: this.getWordSyllables(props.config.word_length)
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

  /**
   * 
   * @returns {sting} A syllable containing a consonant and a vokal or an umlaut
   */
  getRandomSyllable () {
    let vokal = this.filterConfig(this.props.config.vokale)
    let umlaute = this.filterConfig(this.props.config.umlaute)
    let consonants = this.filterConfig(this.props.config.consonant)
    const index_c = this.getRandomInt(consonants.length)
    // if (!consonants.length || ![...umlaute, ...vokal].length) {
    //   window.alert('Bitte mindestend einen ' + (!consonants.length ? 'Konsonant' : 'Vokal oder einen Umlaut') + ' auswählen!');
    //   consonants[0] = !consonants.length ? 'ø' : consonants[0]
    //   umlaute[0] = !umlaute.length ? 'ø' : umlaute[0]
    // }
    if (umlaute.length >= 1) {
      vokal = [...vokal, ...vokal, ...umlaute, ...vokal]
    }
    const index_v = this.getRandomInt(vokal.length)
    return consonants[index_c] + vokal[index_v]
  }

  filterConfig(config: Char) {
    return Object.keys(config).map((x) => {
      return config[x] ? x : false
    }).filter((x) => x) as string[]
  }

  /**
   * 
   * @param max - Maximum value of random number
   * @returns {number} random numer [0-max]
   */
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  /**
   * 
   * @param word_length - How many syllables should the word contain
   * @returns {array} Array of syllables. The first letter of the first array is uppercase.
   */
  getWordSyllables(word_length: number) {
    // Array of syllables
    let syllables: string[] = []
    for (let i = 0; i < word_length; i++) {
      syllables.push(this.getRandomSyllable())
    }
    // First letter uppercase
    syllables[0] = syllables[0][0].toUpperCase() + syllables[0].substring(1)

    return syllables
  }

  newWord(e: KeyboardEvent | MouseEvent) {
    if (e.type === 'mousedown' || (e as KeyboardEvent).key === ' ') {
      e.preventDefault()
      let syllable = this.getWordSyllables(this.props.config.word_length)
      // consonants || (umlaute && vokale) length = 0
      if (syllable.join('').search(/undefined/) !== -1) {
        window.alert('Bitte mindestend einen Konsonant und ein Vokal oder einen Umlaut auswählen!');
        return false
      }
      this.setState({
        syllables: syllable
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
