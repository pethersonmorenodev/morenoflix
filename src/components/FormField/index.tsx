import React from 'react';
import PropTypes from 'prop-types';
import styledBase, { css, StyledComponentBase, StyledComponent } from 'styled-components';

type TInput = {
  hasError?: boolean;
};

const styled = {
  div: styledBase.div,
  span: styledBase.span,
  label: styledBase.label,
  input: styledBase.input
    .withConfig({
      shouldForwardProp: (prop, defaultValidatorFn) => !['hasError'].includes(prop) && defaultValidatorFn(prop),
    })
    .attrs((props: TInput) => props),
};

const FormFieldWrapper = styled.div`
  position: relative;
  margin-bottom: 45px;
  textarea {
    min-height: 150px;
  }
`;
interface ILabel extends StyledComponentBase<'label', any, {}, never> {
  Text: StyledComponent<'span', any, {}, never>;
  ErrorMessage: StyledComponent<'span', any, {}, never>;
}

const Label: ILabel = (styled.label`` as unknown) as ILabel;
Label.Text = styled.span`
  color: #e5e5e5;
  height: 57px;
  position: absolute;
  top: 0;
  left: 15px;

  display: flex;
  align-items: center;

  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;

  transition: 0.1s ease-in-out;
`;
Label.ErrorMessage = styled.span`
  padding-left: 15px;
  color: var(--errorLightMedium);
`;

const Input = styled.input`
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

  padding: 15px 15px 14px;
  &[type='color'] {
    padding: 15px 15px 5px;
    &::-webkit-color-swatch {
      border: none;
    }
  }

  resize: none;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-bottom-color: var(--primary);
  }
  &:focus + ${Label.Text} {
    transform: scale(0.6) translateY(-10px);
  }
  &[type='color'] + ${Label.Text} {
    transform: scale(0.6) translateY(-10px);
  }
  ${({ value }) => {
    const hasValue = value && typeof value === 'string' && value.length > 0;
    return (
      hasValue &&
      css`
        & + ${Label.Text} {
          transform: scale(0.6) translateY(-10px);
        }
      `
    );
  }}
  ${({ hasError }) =>
    hasError &&
    css`
      border-bottom-color: var(--errorMedium);
      margin-bottom: 2px;
    `}
`;

type TParamsFormField = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  suggestions: string[];
  errorMessage?: string;
};

const FormField = ({ label, type, name, value, onChange, onBlur, suggestions, errorMessage }: TParamsFormField) => {
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
          onBlur={onBlur}
          hasError={!!errorMessage}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...onlyInputProps}
        />
        <Label.Text>{label}:</Label.Text>
        {errorMessage && <Label.ErrorMessage>{errorMessage}</Label.ErrorMessage>}
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
