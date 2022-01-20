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
  section: string,
  charsections: {
    vokale: Char,
    umlaute: Char,
    consonant: Char
  }
}
type Titles = {
  [index: string]: string
}

class Menu extends React.Component<MenuProbs, MenuState> {

  title: Titles = {
    config: 'Einstellungen',
    info: 'Info'
  }

  constructor (props: MenuProbs) {
    super(props)
    this.state = {
      menu: false,
      section: 'config',
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
      menu: true,
      section: section
    })
  }

  saveChars = (e: ChangeEvent<HTMLInputElement>, type: "vokale" | "umlaute" | "consonant") => {
    this.setState(prevState =>({
      charsections: {
        ...prevState.charsections,
        [type]: {
          ...prevState.charsections[type],
          // [e.target.value]: !prevState.charsections[type][e.target.value]
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
        <ul id="menu">
          <li><button onClick={() => this.handleShow('config')} data-tip="Einstellungen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="m487 316-42-25c4-23 4-47 0-70l42-25c5-3 7-8 6-14-11-35-30-68-55-94-4-4-10-5-15-3l-42 25c-18-15-39-27-61-35V26c0-6-4-11-9-12-37-8-75-8-110 0-5 1-9 6-9 12v49c-22 8-43 20-61 35L89 86c-5-3-11-2-15 2-25 26-44 59-55 94-1 6 1 12 6 14l42 25c-4 23-4 47 0 70l-42 25c-5 3-7 8-6 14 11 35 30 68 55 94 4 4 10 5 15 3l42-25c18 15 39 27 61 35v49c0 6 4 11 10 12 36 8 74 8 109 0 5-1 9-6 9-12v-49c22-8 43-20 61-35l43 25c4 2 11 2 14-3 25-26 44-59 55-94 2-6-1-12-6-14zm-231 20a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"/></svg></button></li>
          <li><button onClick={() => this.handleShow('info')} data-tip="Info"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M256 8a248 248 0 1 0 0 496 248 248 0 0 0 0-496zm0 110a42 42 0 1 1 0 84 42 42 0 0 1 0-84zm56 254a12 12 0 0 1-12 12h-88a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h12v-64h-12a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h64a12 12 0 0 1 12 12v100h12a12 12 0 0 1 12 12v24z"/></svg></button></li>
        </ul>
        <Offcanvas show={this.state.menu} onHide={this.handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{this.title[this.state.section]}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {this.state.section === 'config' ? (
              <>
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
              </>
            ) : (
              <p>Hallo!</p>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  }
}

export default Menu