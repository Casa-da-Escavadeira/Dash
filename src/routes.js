import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import EstoquesMaq from './pages/EstoquesMaq';
import PCs from './pages/PCs';
import SCs from './pages/SCs';
import Pro_Dash from './pages/Pro_Dash';
import EstoquesGer from './pages/EstoqueGer';
import OPsPosVendas from './pages/OPsPosVendas';
import OPsFilial from './pages/OPsFilial';
import OPsPP from './pages/OPsPP';
import ProductRegister from './pages/ProductRegister';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/estoquemaq" component={EstoquesMaq} />
      <Route path="/pcs" component={PCs} />
      <Route path="/scs" component={SCs} />
      <Route path="/prodash" component={Pro_Dash} />
      <Route path="/productregister" component={ProductRegister} />
      <Route path="/estoqueger" component={EstoquesGer} />
      <Route path="/opspos" component={OPsPosVendas} />
      <Route path="/opsfilial" component={OPsFilial} />
      <Route path="/opspp" component={OPsPP} />
    </BrowserRouter>
  );
}
