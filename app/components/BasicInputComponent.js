import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function mockCheckboxEventObject(event) {
  return {
    target: {
      name: event.target.name,
      value: event.target.checked,
    }
  }
}
const BasicInputComponent = props => {
  return (
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
          props.options.map(function(option, i) {
            return (
              <option
                key={i}
                value={option.value}
                label={option.label}
              >{option.label}</option>
            ) 
          })
        }
      </select>
    )}
  </div>
)
}

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
