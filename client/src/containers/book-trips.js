import React, { Fragment } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from '../components/button';
import { GET_LAUNCH } from './cart-item';
import { TOGGLE_CART } from './action-button';

const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
      }
    }
  }
`;

export default function BookTrips({ cartItems }) {
  let booked = false;

  const [bookTrips, { data, loading, error }] = useMutation(BOOK_TRIPS, {
    variables: { launchIds: cartItems },
  });

  const [removeCard] = useMutation(TOGGLE_CART, {
    variables: { launchId: cartItems },
    update(cache) {
      cache.writeData({ data: { cartItems: [] } });
      window.location = '/app/space-x/profile';
    },
  });

  return data && data.bookTrips && data.bookTrips.success ? (
    <Fragment>
      {(booked = true)}
      <small
        style={{
          textAlign: 'center',
          display: 'block',
          width: '100%',
          paddingBottom: '20px',
          fontWeight: 'bold',
        }}>
        {data.bookTrips.message}
      </small>
      <Button onClick={removeCard} data-testid='book-button'>
        Profil
      </Button>
    </Fragment>
  ) : cartItems.length !== 0 && !booked ? (
    <Button onClick={bookTrips} data-testid='book-button'>
      Book All
    </Button>
  ) : (
    <p data-testid='message'>No items in Cart</p>
  );
}
