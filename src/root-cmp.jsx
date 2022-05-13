import React from "react";
import { connect } from "react-redux";
import { Switch, Route, NavLink } from "react-router-dom"
import { routes } from "./routes"
import { loadToys } from './store/actions/toy.action.js'

function _App(props) {
  return (
    <div className="app">
      <header className="app-header full">
        <h1>Toys B Me</h1>
        <nav>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/toy" exact>Toys</NavLink>
          <NavLink to="/about" exact>About</NavLink>
        </nav>
      </header>
      <main>
        <Switch>
          {routes.map((route) => <Route key={route.path} exact path={route.path} component={route.component}/>)}
        </Switch>
      </main>
    <footer>
      <h1>hello from footer</h1>
    </footer>
    </div>
  )
}

function mapStateToProps(storeState) {
  return {
    count: storeState.toyModule.count,
    // status: storeState.statusModule.status
  }
}
const mapDispatchToProps = {
  loadToys
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)