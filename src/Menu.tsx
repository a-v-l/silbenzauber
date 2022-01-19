import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Menu.css'

type MenuProps = {}
type MenuState = {
  menu: boolean
};

class Menu extends React.Component<MenuProps, MenuState> {

  title: string = ''

  constructor (props: MenuProps) {
    super(props)
    this.state = {
      menu: false
    }
  }

  handleClose = () => {
    this.setState({
      menu: false
    })
  }
  handleShow = (title: string) => {
    this.title = title
    this.setState({
      menu: true
    })
  }

  render () {
    return (
      <>
        <ul id="menu">
          <li><button onClick={() => this.handleShow('Einstellungen')} data-target="config" data-tip="Einstellungen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="m487 316-42-25c4-23 4-47 0-70l42-25c5-3 7-8 6-14-11-35-30-68-55-94-4-4-10-5-15-3l-42 25c-18-15-39-27-61-35V26c0-6-4-11-9-12-37-8-75-8-110 0-5 1-9 6-9 12v49c-22 8-43 20-61 35L89 86c-5-3-11-2-15 2-25 26-44 59-55 94-1 6 1 12 6 14l42 25c-4 23-4 47 0 70l-42 25c-5 3-7 8-6 14 11 35 30 68 55 94 4 4 10 5 15 3l42-25c18 15 39 27 61 35v49c0 6 4 11 10 12 36 8 74 8 109 0 5-1 9-6 9-12v-49c22-8 43-20 61-35l43 25c4 2 11 2 14-3 25-26 44-59 55-94 2-6-1-12-6-14zm-231 20a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"/></svg></button></li>
          <li><button onClick={() => this.handleShow('Info')} data-target="info" data-tip="Info"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M256 8a248 248 0 1 0 0 496 248 248 0 0 0 0-496zm0 110a42 42 0 1 1 0 84 42 42 0 0 1 0-84zm56 254a12 12 0 0 1-12 12h-88a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h12v-64h-12a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h64a12 12 0 0 1 12 12v100h12a12 12 0 0 1 12 12v24z"/></svg></button></li>
        </ul>
        <Offcanvas show={this.state.menu} onHide={this.handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{this.title}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  }
}

export default Menu