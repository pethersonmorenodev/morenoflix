import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, StyledComponentBase, StyledComponent } from 'styled-components';

const FormFieldWrapper = styled.div`
  position: relative;
  textarea {
    min-height: 150px;
  }
  input[type='color'] {
    padding-left: 56px;
  }
`;
interface ILabel extends StyledComponentBase<'label', any, {}, never> {
  Text: StyledComponent<'span', any, {}, never>;
}

const Label: ILabel = (styled.label`` as unknown) as ILabel;
Label.Text = styled.span`
  color: #e5e5e5;
  height: 57px;
  position: absolute;
  top: 0;
  left: 16px;

  display: flex;
  align-items: center;

  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;

  transition: 0.1s ease-in-out;
`;

const Input = (styled.input`
  background: #53585d;
  color: #f5f5f5;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 18px;

  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585d;

  padding: 16px 16px;
  margin-bottom: 45px;

  resize: none;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-bottom-color: var(--primary);
  }
  &:focus:not([type='color']) + ${Label.Text} {
    transform: scale(0.6) translateY(-10px);
  }
  ${({ value }) => {
    const hasValue = value && typeof value === 'string' && value.length > 0;
    return (
      hasValue &&
      css`
        &:not([type='color']) + ${Label.Text} {
          transform: scale(0.6) translateY(-10px);
        }
      `
    );
  }}
` as unknown) as StyledComponent<'input' | 'textarea', any, {}, never>;

type TParamsFormField = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  suggestions: string[];
};

const FormField = ({ label, type, name, value, onChange, suggestions }: TParamsFormField) => {
  const fieldId = `id_${name}`;
  const isTextarea = type === 'textarea';
  const hasSuggestions = suggestions.length > 0;
  let onlyInputProps = {};
  if (!isTextarea) {
    onlyInputProps = {
      type,
      autoComplete: hasSuggestions ? 'off' : 'on',
      list: hasSuggestions ? `suggestionFor_${fieldId}` : undefined,
    };
  }

  return (
    <FormFieldWrapper>
      <Label htmlFor={fieldId}>
        <Input
          as={isTextarea ? 'textarea' : 'input'}
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...onlyInputProps}
        />
        <Label.Text>{label}:</Label.Text>
        {hasSuggestions && (
          <datalist id={`suggestionFor_${fieldId}`}>
            {suggestions.map(suggestion => (
              <option key={suggestion} value={suggestion}>
                {suggestion}
              </option>
            ))}
          </datalist>
        )}
      </Label>
    </FormFieldWrapper>
  );
};
FormField.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
  suggestions: [],
};
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default FormField;
