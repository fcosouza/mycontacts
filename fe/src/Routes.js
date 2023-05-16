import { Switch, Route } from 'react-router-dom';
import EditContact from './pages/EditContact';
import Home from './pages/Home';
import NewContact from './pages/NewContact';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/newcontact" component={NewContact} />
      <Route path="/editcontact/:id" component={EditContact} />
    </Switch>
  );
}
