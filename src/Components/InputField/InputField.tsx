import classNames from 'classnames';
import React, { useState } from 'react';
import { emailFormat, ipFormat } from '../../utiles/RegExp';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  minLength?: number,
  isEmail?: boolean,
  isIp?: boolean,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const InputField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  minLength = 0,
  isEmail = false,
  isIp = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasEmpty = touched && required && !value;
  const isMinLengthError = touched && minLength > value.length;
  const emailError = touched && !value.match(emailFormat) && isEmail;
  const ipIsError = touched && !value.match(ipFormat) && isIp;
  const hasError = hasEmpty || isMinLengthError || emailError;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasEmpty && (
        <p className="help is-danger">{`${label} is required!`}</p>
      )}
      {isMinLengthError && (
        <p className="help is-danger">
          {`Minimum field length is ${minLength}!`}
        </p>
      )}
      {emailError && (
        <p className="help is-danger">
          Email is not valid!
        </p>
      )}
      {ipIsError && (
        <p className="help is-danger">
          IP format is not valid!
        </p>
      )}
    </div>
  );
};
