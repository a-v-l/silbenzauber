import React, { ChangeEvent } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Check from './Check'
import Config from './Config'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Menu.css'

type Char = {
  [index: string]: boolean
}
type MenuProbs = {
  onConfigUpdate: any
}
type MenuState = {
  menu: boolean,
  charsections: {
    vokale: Char,
    umlaute: Char,
    consonant: Char
  }
}

class Menu extends React.Component<MenuProbs, MenuState> {

  constructor (props: MenuProbs) {
    super(props)
    this.state = {
      menu: false,
      charsections: {
        vokale: Config.vokale,
        umlaute: Config.umlaute,
        consonant: Config.consonant
      }
    }
  }

  buildCheckElements = (chars: Char, type: "vokale" | "umlaute" | "consonant") => {
    return Object.keys(chars).map((x) => {
      const id = "char-" + x
      return (
        <Check id={id} key={id} caption={x} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.saveChars(e, type)} checked={chars[x]} />
      )
    })
  }

  handleClose = () => {
    this.setState({
      menu: false
    })
  }
  handleShow = (section: string) => {
    this.setState({
      menu: true
    })
  }

  saveChars = (e: ChangeEvent<HTMLInputElement>, type: "vokale" | "umlaute" | "consonant") => {
    this.setState(prevState =>({
      charsections: {
        ...prevState.charsections,
        [type]: {
          ...prevState.charsections[type],
          [e.target.value]: e.target.checked
        }
      }
    }), () => {
      this.props.onConfigUpdate({
        word_length: 2,
        vokale: this.state.charsections.vokale,
        umlaute: this.state.charsections.umlaute,
        consonant: this.state.charsections.consonant
      })
    })
  }

  render () {
    return (
      <>
        <div id="menu">
          <button onClick={() => this.handleShow('config')} data-tip="Einstellungen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="m487 316-42-25c4-23 4-47 0-70l42-25c5-3 7-8 6-14-11-35-30-68-55-94-4-4-10-5-15-3l-42 25c-18-15-39-27-61-35V26c0-6-4-11-9-12-37-8-75-8-110 0-5 1-9 6-9 12v49c-22 8-43 20-61 35L89 86c-5-3-11-2-15 2-25 26-44 59-55 94-1 6 1 12 6 14l42 25c-4 23-4 47 0 70l-42 25c-5 3-7 8-6 14 11 35 30 68 55 94 4 4 10 5 15 3l42-25c18 15 39 27 61 35v49c0 6 4 11 10 12 36 8 74 8 109 0 5-1 9-6 9-12v-49c22-8 43-20 61-35l43 25c4 2 11 2 14-3 25-26 44-59 55-94 2-6-1-12-6-14zm-231 20a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"/></svg></button>
        </div>
        <Offcanvas show={this.state.menu} onHide={this.handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h2>Silben<span>&#65078;</span>Zauber</h2>
              <p>Der Wortsilbengenerator für Leseanfänger</p>
              </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="fw-bold">Vokale</div>
                {this.buildCheckElements(this.state.charsections.vokale, 'vokale')}
              </li>
              <li className="list-group-item">
                <div className="fw-bold">Umlaute</div>
                {this.buildCheckElements(this.state.charsections.umlaute, 'umlaute')}
              </li>
              <li className="list-group-item">
                <div className="fw-bold">Konsonante</div>
                {this.buildCheckElements(this.state.charsections.consonant, 'consonant')}
              </li>
            </ul>
            <div className="about d-flex justify-content-between">
              <a href="https://github.com/a-v-l/silbenzauber" title="View on Github" target="_blank" rel="noreferrer">
                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.6 0 0 3.7 0 8.2A8.2 8.2 0 0 0 5.6 16c.3 0 .4-.2.4-.4v-1.4h-.8c-1.5 0-1.9-1.1-1.9-1.1-.4-1-.9-1.2-.9-1.2-.7-.5 0-.5 0-.5.9 0 1.3.8 1.3.8.4.7 1 1 1.4 1 .4 0 .7-.2 1-.3 0-.5.2-.9.4-1-1.7-.3-3.6-1-3.6-4.1 0-1 .3-1.7.8-2.2 0-.2-.3-1 0-2.2H4c.3 0 1 .1 2 .8a7.5 7.5 0 0 1 4 0c1-.7 1.7-.8 2-.8h.2a3 3 0 0 1 0 2.2c.6.6.9 1.3.9 2.2 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.3c0 .2 0 .4.4.4h.1c3.2-1.1 5.5-4.2 5.5-7.8C16 3.7 12.4 0 8 0Z" fill="#000"/></svg>
              </a>
              <p>&copy; 2022 <a href="https://www.lucadou.net" target="_blank" rel="noreferrer">lucadou.net</a></p>
              </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  }
}

export default Menu