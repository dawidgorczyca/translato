import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PhraseLanguageComponent extends Component {
  componentWillMount() {
    if (!this.props.checkForTranslation(this.props.id, this.props.phraseIndex)) {
      this.props.langTranslationAdd({phraseIndex: this.props.phraseIndex, content: ''})
    }
  }
  render() {
    return (
      <div className="translation">
        {this.props.name}
        {this.props.children}
      </div>
    )
  }
}

PhraseLanguageComponent.propTypes = {}

PhraseLanguageComponent.defaultProps = {}

export default PhraseLanguageComponent
