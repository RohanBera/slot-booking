import React, { Component } from "react";
import Axios from "axios";

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dates: {},
            datesFetched: false,
            message: "",
            url: "http://localhost:3001",
            formData: {
                user: "",
                roll_number: "",
                slot_number: "",
                paper_link: ""
            }
        }
    }

    /**************** Event handlers *****************/

    formHandler = (event) => {
        var { name, value } = event.target;

        if (name === "roll_number") {
            value = value.toUpperCase();
        }
        this.setState((prevState) => {
            return {
                formData: {
                    ...prevState.formData,
                    [name]: value
                }
            }
        })
    }

    formSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state.formData);

        Axios.post(this.state.url + "/entry/create", this.state.formData).then((res) => {
            console.log(res.statusText);
            this.setState({ message: res.data.message });

            if (res.data.status == 1) {
                Axios.post(this.state.url + "/date/bookSlot", { date: this.state.formData.slot_number }).then((res) => {
                    console.log(res.data.message);
                    this.setState({ message: res.data.message });
                })
            }
        })

        setTimeout(() => {
            window.location.reload(1);
        }, 1500);

    }

    /**************** Fetch dates and slots *******************/

    fetchDates = async () => {
        Axios.get(this.state.url + "/date/view")
            .then((res) => {
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
                        <div style={{ color: "green" }}> {this.state.message} </div>
                    </form>
                    :
                    <div> Loading... </div>
                }
            </div>
        );
    }
}
