import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'

class TranslationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.props.transSetContent(event.target.value, this.props.phraseIndex)
  }
  render() {
    return (
      <div className="translation">
        Translation
        <BasicInputComponent
          name={this.props.name}
          type="text"
          value={this.props.transData.content}
          onChange={(event) => this.handleChange(event)}
        />
      </div>
    )
  }
}

TranslationComponent.propTypes = {}

TranslationComponent.defaultProps = {}

export default TranslationComponent
