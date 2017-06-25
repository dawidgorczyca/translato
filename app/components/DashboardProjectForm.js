import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicInputComponent from '../components/BasicInputComponent'
import styles from '../containers/DashboardPage.css'
import languages from '../statics/languages'

const { dialog } = require('electron').remote

class DashboardProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: '',
      projectPath: '',
      projectSaveSetup: 'multi',
      projectFilename: '',
      projectBaseLanguage: 'en',
    }
  }
  selectProjectPath(event) {
    if (event) {
      event.preventDefault()
    }
    dialog.showOpenDialog({
      title: 'Select a folder for your project',
      properties: ['openDirectory']
    }, (folderPaths) => {
      // folderPaths is an array that contains all the selected paths
      if (folderPaths === undefined) {
        console.log('No destination folder selected')
      } else {
        this.setState({ projectPath: folderPaths[0] })
      }
    })
  }
  generateFilename(projectName = this.state.projectName, saveSetup = this.state.projectSaveSetup, baseLanguage = this.state.projectBaseLanguage) {
    return saveSetup === 'multi' ? `messages_${projectName}_${baseLanguage}` : `messages_${projectName}`
  }
  handleChange(event) {
    switch (event.target.name) {
      case 'projectName':
        this.setState({ projectFilename: this.generateFilename(event.target.value) })
        break
      case 'projectSaveSetup':
        this.setState({ projectFilename: this.generateFilename(undefined, event.target.value, undefined) })
        break
      case 'projectBaseLanguage':
        this.setState({ projectFilename: this.generateFilename(undefined, undefined, event.target.value) })
        break
      default:
        break
    }
    this.setState({ [event.target.name]: event.target.value })
    if (this.props.handleChange) {
      this.props.handleChange(event)
    }
  }
  handleSubmit(event) {
    const data = this.state
    if (this.props.handleSubmit) {
      this.props.handleSubmit(event, data)
    }
  }
  render() {
    return (
      <form className={styles.projectCreator} onSubmit={(event) => this.handleSubmit(event)}>
        <BasicInputComponent
          label="Project name:"
          name="projectName"
          type="text"
          value={this.state.projectName}
          onChange={(event) => this.handleChange(event)}
        />
        <div className={styles.folderSelection}>
          <button className={styles.projectCreator_pathButton} onClick={(event) => this.selectProjectPath(event)}>
            Select folder for your project
          </button>
          <span className={styles.projectCreator_path}>
            {this.state.projectPath}
          </span>
        </div>
        <BasicInputComponent
          label="Separate file for each language"
          name="projectSaveSetup"
          type="radio"
          value="multi"
          wrapperClass="form-split"
          checked={this.state.projectSaveSetup === 'multi'}
          onChange={(event) => this.handleChange(event)}
        />
        <BasicInputComponent
          label="One file for all languages"
          name="projectSaveSetup"
          type="radio"
          value="mono"
          wrapperClass="form-split"
          checked={this.state.projectSaveSetup === 'mono'}
          onChange={(event) => this.handleChange(event)}
        />
        <BasicInputComponent
          label="Filename:"
          name="projectFilename"
          type="text"
          value={this.state.projectFilename}
          onChange={(event) => this.handleChange(event)}
        />
        <BasicInputComponent
          label="Project base language"
          name="projectBaseLanguage"
          type="select"
          options={languages}
          onChange={(event) => this.handleChange(event)}
          value={this.state.projectBaseLanguage}
        />
        <input type="submit" value="Create & Save" className={styles.buttonSubmit} />
      </form>
    )
  }
}

DashboardProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
}

export default DashboardProjectForm
