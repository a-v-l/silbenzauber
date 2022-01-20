import React from 'react'

type CheckProps = {
  id: string
  caption: string
  onChange: any
  checked?: boolean | undefined
}

class Check extends React.Component<CheckProps> {
  render() {
    return (
      <>
        <input type="checkbox" className="btn-check" id={ this.props.id } value={this.props.caption} onChange={this.props.onChange} autoComplete="off" defaultChecked={ this.props.checked } />
        <label className="btn btn-outline-primary btn-sm" htmlFor={ this.props.id }>{ this.props.caption }</label>
      </>
    )
  }
}

export default Check