import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../containers/WorkbenchPage.css'
import { phraseDefaultState } from '../statics/TypesAndDefaults'

class WorkbenchPhrases extends Component {
  render() {
    return (
      <div className={styles.workBench__phrases}>
        <button onClick={() => this.props.addPhrase()}>Add phrase</button>
      </div>
    )
  }
}

WorkbenchPhrases.propTypes = {
  phrases: PropTypes.array.isRequired,
  addPhrase: PropTypes.func.isRequired,
}

WorkbenchPhrases.defaultProps = {
}

export default WorkbenchPhrases
