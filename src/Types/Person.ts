export type Person =
  {
    'id': number,
    'firstName': string,
    'lastName': string,
    'email': string,
    'ip': string,
    'description': string,
  };

export type addedPerson = Omit<Person, 'id'>;
