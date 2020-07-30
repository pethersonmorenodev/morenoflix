import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({
  label, type, name, value, onChange,
}) => {
  const fieldId = `id_${name}`;
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';
  return (
    <div>
      <label htmlFor={fieldId}>
        {label}
        :
        <Component
          id={fieldId}
          type={isTextarea ? undefined : type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};
FormField.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
};
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormField;
