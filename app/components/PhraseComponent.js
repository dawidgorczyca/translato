import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PhraseComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.languages.length !== this.props.languages.length) {
      const languages = []
      nextProps.languages.forEach((item) => {
        languages.push(item.name)
      })
      this.props.phraseSetLanguages(languages)
    }
  }
  render() {
    return (
      <div className="phrase">
        Phrase
        {this.props.children}
      </div>
    )
  }
}

PhraseComponent.propTypes = {}

PhraseComponent.defaultProps = {}

export default PhraseComponent
