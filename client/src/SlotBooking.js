import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Edit from "./components/Edit";
import Form from "./components/Form";
import View from "./components/View";

export default class SlotBooking extends Component {
    render() {
        return (
            <div className="home">
                <header className="header">
                    <a href="/">Pick a slot</a>
                    <a href="/edit">Edit response</a>
                    <a href="/view">View all responses</a>
                </header>

                <main className="main">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Form}></Route>
                            <Route exact path="/edit" component={Edit}></Route>
                            <Route exact path="/view" component={View}></Route>
                        </Switch>
                    </Router>
                </main>
            </div>
        );
    }
}
