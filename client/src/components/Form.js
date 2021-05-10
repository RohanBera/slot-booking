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
                        <div className="label-title">
                            Roll number
                        </div>
                        <div className="label-body">
                            Format : 12MCME08
                        </div>
                        <input
                            type="text"
                            id="id"
                            placeholder="Id"
                        />
                    </label>
                    <br /><br />

                    <div className="label-title">Choose comfortable date</div>
                    {
                        <div className="radio-toolbar">
                            {dates.dates.map(date => (
                                <div key={date._id} className="radio-button-container">
                                    <div className="radio-button">
                                        <input type="radio" id={date.date} name="date" value={date.date} />
                                        <label htmlFor={date.date} >{date.date + " ( " + date.day + " )"}</label>
                                    </div>
                                    <div className="slots">
                                        {date.slots + " slots available!"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    <label htmlFor="pdf">
                        <div className="label-title">
                            Research paper
                        </div>
                        <div className="label-body">
                            You can attach your paper later. <br />
                            You can edit your submission later. <br />
                        </div>
                        <input
                            type="text"
                            id="pdf"
                            placeholder="Research paper"
                        />
                    </label> <br />
                    <button className="submit">Submit</button>
                </form>
            </div>
        );
    }
}
