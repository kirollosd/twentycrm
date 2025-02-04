import { gql } from '@apollo/client';

export const query = gql`
  mutation DeleteOnePerson($idToDelete: ID!) {
    deletePerson(id: $idToDelete) {
      id
    }
  }
`;

export const variables = {
  idToDelete: 'a7286b9a-c039-4a89-9567-2dfa7953cda9',
};

export const responseData = {
  id: 'a7286b9a-c039-4a89-9567-2dfa7953cda9',
};
