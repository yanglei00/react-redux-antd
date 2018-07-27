/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import TestPage from 'containers/TestPage/Loadable';
import GuessOrderPage from 'containers/GuessOrderPage/Loadable';
import ClanMienPage from 'containers/ClanMienPage/Loadable';
import EditClanPage from 'containers/EditClanPage/Loadable';
import MyCamTeamPage from 'containers/MyCamTeamPage/Loadable';
import EditClanInfoPage from 'containers/EditClanInfoPage/Loadable';
import ClanListPage from 'containers/ClanListPage/Loadable';
import ShowPage from 'containers/ShowPage/Loadable';
import Champion from 'containers/Champion/Loadable';
import Ranking from 'containers/Ranking/Loadable';
import CamList from 'containers/CamListPage/Loadable';
import CamTask from 'containers/Camtask/Loadable';
import TopicDetail from 'containers/TopicDetailPage/Loadable';
import ActivityRule from 'containers/ActivityRule/Loadable';
import Vote from 'containers/Vote/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet defaultTitle="社群争霸赛"></Helmet>
    
    {/* <Header /> */}
    <Switch>
      <Route exact path="/race/" component={HomePage} />
      <Route path="/race/home" component={HomePage} />
      <Route path="/race/features" component={FeaturePage} />
      <Route path="/race/clanMien" component={ClanMienPage} />
      <Route path="/race/editClan" component={EditClanPage} />
      <Route path="/race/editClanInfo" component={EditClanInfoPage} />
      <Route path="/race/clanList" component={ClanListPage} />
      <Route path="/race/guessOrder" component={GuessOrderPage} />
      <Route path="/race/myCamTeam" component={MyCamTeamPage} />
      <Route path="/race/champion" component={Champion} />
      <Route path="/race/ranking" component={Ranking} />
      <Route path="/race/camList" component={CamList} />
      <Route path="/race/camTask" component={CamTask} />
      <Route path="/race/topicDetail" component={TopicDetail} />
      <Route path="/race/rule" component={ActivityRule} />
      <Route path="/race/vote" component={Vote} />
      {/* <Route path="/test" component={TestPage} /> */}
      <Route path="" component={NotFoundPage} />
    </Switch>
    {/* <Footer /> */}
  </div>
);

export default App;
