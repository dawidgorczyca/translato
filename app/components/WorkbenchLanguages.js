import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/WorkbenchPage.css'
import { projectDefaultState } from '../statics/TypesAndDefaults'
import languages from '../statics/languages'

class WorkbenchLanguages extends Component {
  renderLanguages(base, projectLanguages) {
    let list = [base]

    if (projectLanguages) list = list.concat(projectLanguages)
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
          <BasicInputComponent
            label="Select language"
            name="languageAdd"
            type="select"
            options={languages}
            onChange={(event) => this.props.handleChange(event)}
            value={this.props.languageAdd}
          />
          <button onClick={() => addLanguage({ name: this.props.languageAdd, translations: [] })}>
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
  deleteLanguage: PropTypes.func.isRequired,
  languageAdd: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

WorkbenchLanguages.defaultProps = {
  projectLanguages: [],
  handleChange: (event) => console.log(event)
}

export default WorkbenchLanguages
