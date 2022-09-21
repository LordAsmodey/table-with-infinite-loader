import React from 'react';
import cn from 'classnames';
import { Person } from '../../Types/Person';

type Props = {
  rowsInTable: number,
  people: Person[],
  setNextPage: CallableFunction,
  isLoading: boolean,
  onDelete: (id: number) => void,
};

export const PeopleTable: React.FC<Props> = React.memo((props) => {
  const {
    rowsInTable,
    people,
    setNextPage,
    isLoading,
    onDelete,
  } = props;

  return (
    <>
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>IP Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>IP Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </tfoot>
        <tbody>
          {people.map((person, index) => (
            <tr key={person.id}>
              <td>{index + 1}</td>
              <td>{person.firstName}</td>
              <td>
                {person.lastName}
              </td>
              <td>{person.email}</td>
              <td>{person.ip}</td>
              <td>{person.description}</td>
              <td>
                <button
                  className="button is-danger is-light"
                  onClick={() => {
                    onDelete(person.id);
                  }}
                  type="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="is-flex is-justify-content-center">
        <button
          className={cn('button is-info', { 'is-loading': isLoading })}
          onClick={() => {
            setNextPage();
          }}
          type="button"
          disabled={isLoading}
        >
          {`Load next ${rowsInTable} fields`}
        </button>
      </div>
    </>
  );
});
