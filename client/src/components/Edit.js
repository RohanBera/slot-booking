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


    toggleUpdate = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: !this.state[name]
        })
    }

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

                    <hr />

                    {this.state.updateDate
                        ?
                        <div>
                            <div className="label-title">Update date</div>
                            <div className="radio-toolbar">
                                {dates.dates.map(date => (
                                    <div key={date._id} className="radio-button-container">
                                        <div key={date._id} className="radio-button">
                                            <input type="radio" id={date.date} name="date" value={date.date} />
                                            <label htmlFor={date.date} >{date.date + " ( " + date.day + " )"}</label>
                                        </div>
                                        <div className="slots">
                                            {date.slots + " slots available!"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                name="updateDate"
                                className="submit cancel"
                                onClick={this.toggleUpdate}
                            > Cancel</button>
                        </div>
                        :
                        <>
                            <button
                                type="button"
                                name="updateDate"
                                className="submit"
                                onClick={this.toggleUpdate}
                            > Update date</button> <br />
                        </>
                    }

                    <hr />

                    {this.state.updatePaper
                        ?
                        <div>
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
                            <br />
                            <button
                                type="button cancel"
                                className="submit"
                                name="updatePaper"
                                onClick={this.toggleUpdate}
                            > Cancel</button>
                        </div>
                        :
                        <>
                            <button
                                className="submit"
                                name="updatePaper"
                                onClick={this.toggleUpdate}
                            >Update paper</button> <br />
                        </>
                    }

                    <hr />

                    <button className="submit">Submit</button>

                </form>
            </div>
        );
    }
}
