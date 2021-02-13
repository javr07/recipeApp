import React, { Component }  from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import AddRecipe from "./components/addRecipe";
import Recipe from "./components/recipe";
import RecipesList from "./components/recipeList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/recipes" className="navbar-brand">
          Recipes?
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/recipes"} className="nav-link">
              Recipes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/recipes"]} component={RecipesList}/>
          <Route exact path="/add" component={AddRecipe}/>
          <Route path="/recipes/:id" component={Recipe}/>
          <Redirect to="/" /> 
        </Switch>
      </div>
    </div>
  );
}
export default App
