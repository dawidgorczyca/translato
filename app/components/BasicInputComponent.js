import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// Toggle usage
/* <BasicInputComponent
  label="Toggle testing"
  name="testToggle"
  type="toggle"
  checked={this.state.testToggle}
  wrapperClass="toggleWrap"
  onChange={(event) => this.handleChange(event)}
/> */

function mockCheckboxEventObject(event) {
  return {
    target: {
      name: event.target.name,
      value: event.target.checked,
    }
  }
}

function mockToggleEventObject(name, value) {
  return {
    target: {
      name,
      value: !value,
    }
  }
}

const ToggleInput = props => (
  <div className={'toggleInput-wrap'} role="button" onClick={props.onChange}>
    {(props.checked ?
      <div className={classnames('toggleInput-handle', 'toggleInput-on')} /> :
      <div className={classnames('toggleInput-handle', 'toggleInput-off')} />
    )}
  </div>
)

ToggleInput.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

ToggleInput.defaultProps = {
  checked: false,
}

const BasicInputComponent = props => (
  <div className={classnames('basic-input', props.wrapperClass, `input-${props.type}`)}>
    {(props.label && props.type !== 'checkbox' && props.type !== 'radio' ?
      <label htmlFor={props.name}>{props.label}</label> : ''
    )}
    {(props.type === 'text' ?
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      /> : ''
    )}
    {(props.type === 'radio' ?
      <label>
        <input
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          checked={props.checked}
        />
        {props.label ? props.label : ''}
      </label> : ''
    )}
    {(props.type === 'checkbox' ?
      <label>
        <input
          name={props.name}
          type={props.type}
          onChange={(event) => props.onChange(mockCheckboxEventObject(event))}
        />
        {props.label ? props.label : ''}
      </label> : ''
    )}
    {(props.type === 'select' &&
      <select
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {
          props.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              label={option.label}
            >{option.label}</option>
            ))
        }
      </select>
    )}
    {(props.type === 'toggle' ?
      <ToggleInput
        name={props.name}
        type={props.type}
        checked={props.checked}
        onChange={() => props.onChange(mockToggleEventObject(props.name, props.checked))}
      /> : ''
    )}
  </div>
)

BasicInputComponent.propTypes = {
  label: PropTypes.string,
  wrapperClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()),
  checked: PropTypes.bool,
}

BasicInputComponent.defaultProps = {
  label: '',
  wrapperClass: '',
  options: [],
  checked: false,
  value: '',
}

export default BasicInputComponent
