import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/WorkbenchPage.css'
import { projectDefaultState } from '../statics/TypesAndDefaults'

class WorkbenchLanguages extends Component {
  renderLanguages(base, languages) {
    let list = [base]

    if (languages) list = list.concat(languages)
    return list.map((item, index) => {
      if (typeof item === 'object') {
        return (
          <span
            key={index}
            className={styles.workBench__lang}
            onClick={() => this.props.deleteLanguage(index)}
          >
            {item.name}
          </span>
        )
      }
      return (
        <span
          key={index}
          className={styles.workBench__lang}
          onClick={() => this.props.deleteLanguage(index)}
        >
          {item}
        </span>
      )
    })
  }
  render() {
    const { projectBaseLanguage, projectLanguages, addLanguage } = this.props
    const langs = projectLanguages ? this.renderLanguages(projectBaseLanguage, projectLanguages) : this.renderLanguages(projectBaseLanguage)
    return (
      <div className={styles.workBench__langBar}>
        {langs}
        <div className={styles.workBench__langBar__toolbox}>
          <button onClick={() => addLanguage({ name: 'PL', translations: [] })}>
            Add new language
          </button>
        </div>
      </div>
    )
  }
}

WorkbenchLanguages.propTypes = {
  projectBaseLanguage: PropTypes.string.isRequired,
  projectLanguages: PropTypes.arrayOf(projectDefaultState),
  addLanguage: PropTypes.func.isRequired,
  deleteLanguage: PropTypes.func.isRequired,
}

WorkbenchLanguages.defaultProps = {
  projectLanguages: []
}

export default WorkbenchLanguages
