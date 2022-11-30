import React from "react";
import {
  Link
} from "react-router-dom";
import { getNextFiveDays } from "../utils/utils";

export const Navbar = () => {

    console.log(getNextFiveDays());

    const nextFiveDays = getNextFiveDays();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Weather App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    {
                        nextFiveDays.map((day, index) => {
                            return (
                                <li className="nav-item active" key={'liDay' + index}>
                                    <Link to={"/" + day} className="nav-link">{day}</Link>
                                </li>  
                            )
                        })
                    }

                </ul>
            </div>
        </nav>
    );

};