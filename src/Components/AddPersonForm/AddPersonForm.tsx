import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { InputField } from '../InputField/InputField';
import { addPerson } from '../../api/api';
import { Person } from '../../Types/Person';
import { emailFormat, ipFormat } from '../../utiles/RegExp';

type Props = {
  isOpen: boolean,
  setIsOpen: CallableFunction,
  onAddPerson: (person: Person) => void;
};

export const AddPersonForm: React.FC<Props> = React.memo((props) => {
  const { isOpen, setIsOpen, onAddPerson } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [ip, setIp] = useState('');
  const [description, setDescription] = useState('');
  const [isServerError, setIsServerError] = useState(false);

  const hasError = useMemo(() => {
    return lastName.length > 0
      && firstName.length > 0
      && email.match(emailFormat)
      && ip.match(ipFormat)
      && description.length > 20;
  }, [firstName, lastName, email, ip, description]);

  const clearForm = useCallback(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setIp('');
    setDescription('');
  }, []);

  const addNewPersonHandler = () => {
    if (hasError) {
      setIsServerError(false);
      const newPerson = {
        firstName,
        lastName,
        email,
        ip,
        description,
      };

      addPerson(newPerson)
        .then((response) => {
          onAddPerson(response);
          clearForm();
        })
        .catch(() => setIsServerError(true));
    }
  };

  return (
    <>
      {isOpen && (
        <div className={cn('modal', { 'is-active': isOpen })}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add new person</p>
              <button
                type="button"
                className="delete"
                aria-label="close"
                onClick={() => {
                  setIsOpen(false);
                  clearForm();
                }}
              >
              </button>
            </header>
            <section className="modal-card-body">
              <form onSubmit={
                (event) => event.preventDefault()
              }
              >
                <InputField
                  name="First name"
                  value={firstName}
                  label="First name"
                  required
                  onChange={setFirstName}
                />

                <InputField
                  name="Last name"
                  value={lastName}
                  label="Last name"
                  required
                  onChange={setLastName}
                />

                <InputField
                  name="E-mail"
                  value={email}
                  label="E-mail"
                  required
                  isEmail
                  onChange={setEmail}
                />

                <InputField
                  name="Ip Address"
                  value={ip}
                  label="IP Address"
                  isIp
                  required
                  minLength={8}
                  onChange={setIp}
                />

                <InputField
                  name="Description"
                  value={description}
                  label="Description"
                  minLength={20}
                  required
                  onChange={setDescription}
                />
              </form>
            </section>
            <footer className="modal-card-foot">

              <button
                type="button"
                className="button is-success"
                onClick={() => addNewPersonHandler()}
                disabled={!hasError}
              >
                Add person
              </button>
              <button
                type="button"
                className="button"
                onClick={() => clearForm()}
              >
                Clear form
              </button>
              {isServerError && (
                <p className="help is-danger">
                  Something went wrong. Try again!
                </p>
              )}
            </footer>
          </div>
        </div>
      )}
    </>
  );
});
