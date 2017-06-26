import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/WorkbenchPage.css'

class WorkbenchLanguages extends Component {
  renderLanguages(base, languages) {
    console.log(languages)
    let list = [base]

    if (languages) list = list.concat(languages)
    console.log(list)
    return list.map((item, index) => {
      if (typeof item === 'object') {
        return <span key={index} className={styles.workBench__lang}>{item.name}</span>
      } else {
        return <span key={index} className={styles.workBench__lang}>{item}</span>
      }
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
  projectLanguages: PropTypes.array,
  addLanguage: PropTypes.func.isRequired,
}

WorkbenchLanguages.defaultProps = {}

export default WorkbenchLanguages
