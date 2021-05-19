import React, { Component } from "react";
import Axios from "axios";
// import dates from "../dates.json";


export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // url: "http://localhost:3001",
            url: "https://biometrics-slot-booking.herokuapp.com",
            updateDate: false,
            updatePaper: false,
            datesFetched: false,
            dates: {},
            roll_number: "",
            slot_number: "",
            paper_link: null,
            slotMessage: "",
            paperMessage: "",
        }
    }

    /**************** Event handlers *****************/


    toggleUpdate = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: !this.state[name]
        })
    }

    formHandler = (event) => {
        var { name, value } = event.target;

        if (name === "roll_number") {
            value = value.toUpperCase();
        }
        this.setState({
            [name]: value
        })
    }

    fileHandler = (event) => {
        this.setState({
            paper_link: event.target.files[0]
        })
    }

    formSubmit = (event) => {
        event.preventDefault();

        // update slot 
        if (this.state.updateDate) {

            try {
                Axios.post(this.state.url + "/entry/userDate", { id: this.state.roll_number }).then((res) => {

                    if (res.data.length === 0) {
                        this.setState({ slotMessage: "No user found! Please register first!" });
                    }
                    else {
                        if (this.state.slot_number === res.data[0].slot_number) {
                            this.setState({ slotMessage: "U already have this slot!" });
                        }
                        else {

                            // update slots db
                            var query = {
                                oldDate: res.data[0].slot_number,
                                newDate: this.state.slot_number,
                            }

                            Axios.post(this.state.url + "/date/updateSlot", query).then((res) => {
                                this.setState({ slotMessage: res.data.message });
                            })

                            // update user db
                            var updateQuery = {
                                id: this.state.roll_number,
                                update: {
                                    slot_number: this.state.slot_number,
                                }
                            };

                            Axios.post(this.state.url + "/entry/update", updateQuery).then((res) => {
                                this.setState({ slotMessage: res.data.message });
                            });

                            if (!this.state.updatePaper) {
                                setTimeout(() => {
                                    window.location.reload(1);
                                }, 1500);
                            }
                        }

                    }
                })
            } catch (err) {
                this.setState({ slotMessage: err.message });
            }

        }


        // update paper
        if (this.state.updatePaper) {

            try {
                Axios.post(this.state.url + "/entry/userDate", { id: this.state.roll_number }).then((res) => {
                    if (res.data.length === 0) {
                        this.setState({ paperMessage: "No user found! Please register first!" });
                    }
                    else {
                        const head = {
                            'Content-Type': 'multipart/form-data'
                        }
                        const formData = new FormData()
                        formData.append('roll_number', this.state.roll_number);
                        formData.append('paper_link', this.state.paper_link);

                        Axios.post(this.state.url + "/entry/paper-update", formData, { headers: head })
                            .then((res) => {
                                this.setState({ paperMessage: res.data.message });
                            }).catch(err => {
                                this.setState({ paperMessage: err.message });
                            });

                        setTimeout(() => {
                            window.location.reload(1);
                        }, 1500);
                    }
                });
            } catch (err) {
                this.setState({ paperMessage: err.message });
            }
        }
    }
    /**************** Fetch dates and slots *******************/

    fetchDates = async () => {
        Axios.get(this.state.url + "/date/view")
            .then((res) => {
                this.setState({
                    dates: res.data,
                    datesFetched: true
                });
            })
    }

    componentDidMount = async () => {
        this.fetchDates();
    }

    render() {
        return (
            <div className="form">
                {this.state.datesFetched ?
                    <form onSubmit={this.formSubmit} encType="multipart/form-data">
                        <label htmlFor="id">
                            <div className="label-title">
                                Roll number <span className="red-star">*</span>
                            </div>
                            <input
                                style={{ textTransform: "uppercase" }}
                                type="text"
                                id="id"
                                name="roll_number"
                                value={this.state.roll_number}
                                placeholder="eg : 12MCME21"
                                onChange={this.formHandler}
                                required
                            />
                        </label>

                        <hr />

                        {this.state.updateDate
                            ?
                            <div>
                                <div className="label-title">Update date <span className="red-star">*</span></div>
                                <div className="radio-toolbar">
                                    {this.state.dates.map(date => (
                                        <div key={date._id} className="radio-button-container">
                                            <div key={date._id} className="radio-button">
                                                <input
                                                    type="radio"
                                                    id={date.date}
                                                    name="slot_number"
                                                    value={date.date}
                                                    onChange={this.formHandler}
                                                    required
                                                    disabled={date.slots === 0 ? true : false}
                                                />
                                                <label className={date.slots === 0 ? "disabled" : ""} htmlFor={date.date} >{date.date + " ( " + date.day + " )"}</label>
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
                                <div style={{ color: "green" }}> {this.state.slotMessage} </div>

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
                                    <span className="red-star">*</span>
                                </div>
                                <div className="label-body">
                                    <br />
                                </div>
                                <input
                                    type="file"
                                    name="paper_link"
                                    id="pdf"
                                    accept=".pdf"
                                    placeholder="Research paper"
                                    onChange={this.fileHandler}
                                    required
                                />

                                <br />
                                <button
                                    type="button cancel"
                                    className="submit"
                                    name="updatePaper"
                                    onClick={this.toggleUpdate}
                                > Cancel</button>
                                <div style={{ color: "green" }}> {this.state.paperMessage} </div>

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

                        <input type="submit" className="submit" value="Submit" />
                    </form>
                    :
                    <div>Loading...</div>
                }
            </div>
        );
    }
}
