import React, { Component } from "react";
import Axios from "axios";
// import dates from "../dates.json";

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dates: {},
            datesFetched: false,
            user: "",
            roll_number: "",
            slot_number: "",
            paper_link: ""
        }
    }

    /**************** Event handlers *****************/

    formHandler = (event) => {
        var { name, value } = event.target;

        if (name === "roll_number") {
            value = value.toUpperCase();
        }
        this.setState({
            [name]: value,
        })
    }

    formSubmit = (event) => {
        console.log(this.state);
    }

    /**************** Fetch dates and slots *******************/

    fetchDates = async () => {
        let URL = "http://localhost:3001";

        Axios.get(URL + "/date/view").then((res) => {
            this.setState({
                dates: res.data,
                datesFetched: true
            });
            // console.log(this.state.dates);
        })
    }

    componentDidMount = async () => {
        this.fetchDates();
    }

    render() {
        return (
            <div className="form">
                {this.state.datesFetched ?
                    <form>
                        <label htmlFor="name">
                            <div className="label-title">
                                Name <span className="red-star">*</span>
                            </div>
                            <input
                                type="text"
                                id="name"
                                name="user"
                                placeholder="eg : Barry Allen"
                                onChange={this.formHandler}
                                required
                            />
                        </label>

                        <label htmlFor="id">
                            <div className="label-title">
                                Roll number <span className="red-star">*</span>
                            </div>
                            <input
                                style={{ textTransform: "uppercase" }}
                                type="text"
                                id="id"
                                name="roll_number"
                                placeholder="eg : 12MCME21"
                                onChange={this.formHandler}
                                required
                            />
                        </label>

                        <div className="label-title">Choose comfortable date
                        <span className="red-star">*</span>
                        </div>
                        {
                            <div className="radio-toolbar">
                                {this.state.dates.map(date => (
                                    <div key={date._id} className="radio-button-container">
                                        <div className="radio-button">
                                            <input
                                                type="radio"
                                                id={date.date}
                                                name="slot_number"
                                                value={date.date}
                                                onChange={this.formHandler}
                                                required
                                            />
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
                        <input type="submit" className="submit" onClick={this.formSubmit} />
                    </form>
                    :
                    <div> Loading... </div>
                }
            </div>
        );
    }
}
