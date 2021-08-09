import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import PCs from './pages/PCs';
import SCs from './pages/SCs';
import Pro_Dash from './pages/Pro_Dash';
import ProductRegister from './pages/ProductRegister';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/pcs" component={PCs} />
      <Route path="/scs" component={SCs} />
      <Route path="/prodash" component={Pro_Dash} />
      <Route path="/productregister" component={ProductRegister} />
    </BrowserRouter>
  );
}
