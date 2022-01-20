import React from 'react'
import ReactDOM from 'react-dom'
import Config from './Config'
import Spell from './Spell'
import Menu from './Menu'
import './index.css'

type Char = {
  [index: string]: boolean
}
type GeneratorState = {
  word_length: number,
  vokale: Char,
  umlaute: Char,
  consonant: Char
}

class SpellGenerator extends React.Component<{}, GeneratorState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      word_length: Config.word_length,
      vokale: Config.vokale,
      umlaute: Config.umlaute,
      consonant: Config.consonant
    }
  }

  handleConfigUpdate = (updatedconfig: GeneratorState) => {
    this.setState({
      word_length: updatedconfig.word_length,
      vokale: updatedconfig.vokale,
      umlaute: updatedconfig.umlaute,
      consonant: updatedconfig.consonant
    })
  }

  render () {
    return (
      <>
        <Menu onConfigUpdate={this.handleConfigUpdate} />
        <Spell config={{
          word_length: this.state.word_length,
          vokale: this.state.vokale,
          umlaute: this.state.umlaute,
          consonant: this.state.consonant
        }} />
      </>
    )
  }
}

ReactDOM.render(
  <SpellGenerator />,
  document.getElementById('root')
)
