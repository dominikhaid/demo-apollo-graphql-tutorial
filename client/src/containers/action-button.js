import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;
export default function ActionButton({ isBooked, id, isInCart }) {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: { launchId: id },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id },
        },
      ],
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      {!isBooked || (
        <small
          style={{
            textAlign: 'center',
            display: 'block',
            width: '100%',
            paddingBottom: '20px',
            fontWeight: 'bold',
          }}>
          You have already booked this flight
        </small>
      )}
      {!isInCart || (
        <small
          style={{
            textAlign: 'center',
            display: 'block',
            width: '100%',
            paddingBottom: '20px',
            fontWeight: 'bold',
          }}>
          This flight is your cart
        </small>
      )}
      <Button
        onClick={mutate}
        isBooked={isBooked}
        data-testid={'action-button'}>
        {isBooked
          ? 'Cancel This Trip'
          : isInCart
          ? 'Remove from Cart'
          : 'Add to Cart'}
      </Button>
    </div>
  );
}
