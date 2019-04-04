import React from "react";
import { Redirect, Switch } from 'react-router-dom';
import AppliedRoute from './AppliedRoute';
import Overview from './overview'
import Recognize from './recognize/recognize'
import RewardsActivities from './rewards-history/rewardsActivities'
import Redeem from './redeem/index'
import Login from './login'

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
    <AppliedRoute path="/overview" component={Overview} props={childProps}/>
    <AppliedRoute path="/recognize" component={Recognize} props={childProps}/>
    <AppliedRoute path="/redeem" component={Redeem} props={childProps}/>
    <AppliedRoute path="/rewards_activities" component={RewardsActivities} props={childProps}/>
    <Redirect from="/" to="/overview" />
  </Switch>;