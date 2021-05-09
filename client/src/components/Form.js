import React, { Component } from "react";
import dates from "../dates.json";

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    /**************** Event handlers *****************/



    /**************** Fetch dates and slots *******************/

    fetchDates = async () => {
        // let URL = localStorage.getItem('instance-url')
        let URL = "https://localhost:3002";

        // const dates = await fetch(URL + "/date/view");

    }

    componentDidMount = async () => {
        this.fetchDates();
    }

    render() {
        return (
            <div className="form">
                <form>
                    <label htmlFor="id">
                        <div>
                            Roll number
                        </div>
                        - Enter in the format 12MCME08 <br />
                        <input
                            type="text"
                            id="id"
                            placeholder="Id"
                        />
                    </label>
                    <br /><br />

                    <div>Choose comforatable date</div>
                    {
                        <div className="radio-toolbar">
                            {dates.dates.map(date => (
                                <div key={date._id}>
                                    <input type="radio" id={date.date} name="date" value={date.date} />
                                    <label htmlFor={date.date} >{date.date + " " + date.day}</label>
                                </div>
                            ))}
                        </div>
                    }
                    <br /><br />

                    <label htmlFor="pdf">
                        <div>
                            Research paper
                        </div>
                        - You can attach your paper later. <br />
                        - You can edit your submission later. <br />
                        <input
                            type="text"
                            id="pdf"
                            placeholder="Research paper"
                        />
                    </label> <br />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
