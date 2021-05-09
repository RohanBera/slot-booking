import React, { Component } from "react";
import dates from "../dates.json";


export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            updateDate: false,
            updatePaper: false
        }
    }

    /**************** Event handlers *****************/




    /**************** Fetch dates and slots *******************/

    fetchDates = async () => {

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

                    {!this.state.updateDate &&
                        <div>
                            <div>Update date</div>
                            <div className="radio-toolbar">
                                {dates.dates.map(date => (
                                    <div key={date._id}>
                                        <input type="radio" id={date.date} name="date" value={date.date} />
                                        <label htmlFor={date.date} >{date.date + " " + date.day}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <button type="button" > Update date</button>


                    <br /><br />

                    {this.state.updatePaper &&
                        <div>
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
                            <br />
                            <button type="button" > Cancel</button>
                        </div>
                    }

                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
