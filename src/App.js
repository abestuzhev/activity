import React from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar';
import Tasks from './components/Tasks/Tasks';

function App() {
  return (
    <>
        <div className="todo">
            <Sidebar/>

            <Switch>
              <Route path="/tasks" exact>
                <Tasks />
              </Route>
              <Route path="/tasks/:idCategory" exact>
                <Tasks />
              </Route>
              <Route path="/" exact>
                <Tasks />
              </Route>
            </Switch>
            
        </div>
    </>
  );
}

export default App;
