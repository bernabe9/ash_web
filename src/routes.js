import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ServerStatusPage from './components/serverStatus/ServerStatusPage';
import LoginPage from './components/login/LoginPage';
import CreateUserPage from './components/users/CreateUserPage';
import LogoutPage from './components/logout/LogoutPage';
import * as auth from './api/redirectLoginApi';
import ResetPasswordPage from './components/reset/ResetPasswordPage';
import UpdatePassPage from './components/updatePass/UpdatePassPage';
import HomePage from './containers/HomePage';
import AnimalPage from './containers/AnimalPage';
import PerfilPage from './containers/PerfilPage';
import AdoptantesPage from './containers/AdoptantesPage';
import EstadisticasPage from './containers/EstadisticasPage';
import TestPage from './containers/TestPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute  onEnter={auth.CheckAuth}  component={HomePage}/>
    <Route path="serverStatus" component={ServerStatusPage}/>
    <Route path="login" onEnter={auth.CheckIfUnlogged} component={LoginPage}/>
    <Route path="solicitud-registro" onEnter={auth.CheckIfUnlogged} component={CreateUserPage}/>
    <Route path="logout" onEnter={auth.CheckAuth} component={LogoutPage}/>
    <Route path="reset" onEnter={auth.CheckIfUnlogged} component={ResetPasswordPage}/>
    <Route path="updatePass" onEnter={auth.CheckIfUnlogged} component={UpdatePassPage}/>
    <Route path="animales" onEnter={auth.CheckAuth} component={AnimalPage}/>
    <Route path="perfil" onEnter={auth.CheckAuth} component={PerfilPage}/>
    <Route path="adoptantes" onEnter={auth.CheckAuth} component={AdoptantesPage}/>
    <Route path="estadisticas" onEnter={auth.CheckAuth} component={EstadisticasPage}/>
    <Route path="test" component={TestPage}/>
  </Route>
);
