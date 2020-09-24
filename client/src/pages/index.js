import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';

export default function Pages({}) {
  return (
    <Fragment>
      <PageContainer>
        <Router basename={'/app/space-x'} primary={false} component={Fragment}>
          <Launches path='/app/space-x' />
          <Launch path='/app/space-x/launch/:launchId' />
          <Cart path='/app/space-x/cart' />
          <Profile path='/app/space-x/profile' />
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
