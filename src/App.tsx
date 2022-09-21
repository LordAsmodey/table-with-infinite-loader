import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { PeopleTable } from './Components/PeopleTable/PeopleTable';
import { AddPersonForm } from './Components/AddPersonForm/AddPersonForm';
import { Person } from './Types/Person';
import { deletePerson, getPeople } from './api/api';

export const App: React.FC = () => {
  const [rowsInTable, setRowsInTable] = useState(5);
  const [isSelected, setIsSelected] = useState(false);
  const [isAddPersonFormOpen, setIsAddPersonFormOpen] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getPeople(page, rowsInTable)
      .then((response) => {
        setPeople((prevState) => {
          if (page === 1) {
            return [...response];
          }

          return [...prevState, ...response]
            .sort((a, b) => a.id - b.id)
            .filter((person, index, array) => {
              if (array[index + 1]) {
                return person.id !== array[index + 1].id;
              }

              return true;
            });
        });
      }).catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [rowsInTable, page]);

  const setNextPage = useCallback(() => {
    setPage((prevState) => prevState + 1);
  }, []);

  const onAddPersonHandler = useCallback((person: Person) => {
    setPeople((prevState) => (
      [...prevState, person]
    ));
  }, []);

  const onDeletePersonHandler = useCallback((id: number) => {
    deletePerson(id)
      .then(() => {
        setPeople((prevState) => prevState.filter(person => person.id !== id));
      });
  }, []);

  return (
    <div className="box app">
      <div
        className="
        box is-flex is-justify-content-space-around app__control-items"
      >
        <button
          type="button"
          className="button is-info"
          onClick={() => setIsAddPersonFormOpen(true)}
        >
          Add person
        </button>

        <div className="select">
          <select
            value={rowsInTable}
            onChange={(event) => {
              setRowsInTable(+event.target.value);
              setIsSelected(false);
            }}
            disabled={isSelected}
          >
            <option value="5">Upload 5 fields</option>
            <option value="6">Upload 6 fields</option>
            <option value="7">Upload 7 fields</option>
            <option value="8">Upload 8 fields</option>
            <option value="9">Upload 9 fields</option>
            <option value="10">Upload 10 fields</option>
            <option value="11">Upload 11 fields</option>
            <option value="12">Upload 12 fields</option>
            <option value="13">Upload 13 fields</option>
            <option value="14">Upload 14 fields</option>
            <option value="15">Upload 15 fields</option>
          </select>
        </div>
      </div>
      {!isError && (
        <PeopleTable
          people={people}
          rowsInTable={rowsInTable}
          setNextPage={setNextPage}
          isLoading={isLoading}
          onDelete={onDeletePersonHandler}
        />
      )}
      <AddPersonForm
        isOpen={isAddPersonFormOpen}
        setIsOpen={setIsAddPersonFormOpen}
        onAddPerson={onAddPersonHandler}
      />
      {isError && (
        <p className="help is-danger">
          Something went wrong. Try again!
        </p>
      )}
    </div>
  );
};
