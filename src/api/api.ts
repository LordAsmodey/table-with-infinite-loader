import { addedPerson, Person } from '../Types/Person';

const BASE_URL = 'http://localhost:4000/people';

export function getPeople(page: number, limit: number): Promise<Person[]> {
  return fetch(`${BASE_URL}?_page=${page}&_limit=${limit}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Something went wrong');
    });
}

export function addPerson(person: addedPerson): Promise<Person> {
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(person),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Something went wrong');
    });
}

export function deletePerson(id: number): Promise<Person> {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Something went wrong');
    });
}
