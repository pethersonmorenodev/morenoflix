import React from 'react';

const FormField = ({ label, type, name, value, onChange })=>{
  const isTextarea = type === 'textarea';
  const Component = isTextarea?'textarea':'input';
  return (
    <div>
      <label>
        {label}:
        <Component
          type={isTextarea?undefined:type}
          name={name}
          value={value}
          onChange={onChange}
          />
      </label>
    </div>
  );
};

export default FormField;