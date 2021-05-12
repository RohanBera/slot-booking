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
                paper_link: null
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

    fileHandler = (event) => {
        this.setState(prevState => {
            return {
                formData: {
                    ...prevState.formData,
                    paper_link: event.target.files[0],
                }
            }
        })
    }

    formSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.formData);
        console.log(this.state.formData.paper_link);
        const head = {
            'Content-Type': 'multipart/form-data'
        }
        if(this.state.formData.paper_link === null){
            Axios.post(this.state.url + "/entry/create", this.state.formData)
            .then((res) => {
                console.log(res.statusText);
                this.setState({ message: res.data.message });

                if (res.data.status === 1) {
                    Axios.post(this.state.url + "/date/bookSlot", { date: this.state.formData.slot_number })
                    .then((res) => {
                        console.log(res.data.message);
                        this.setState({ message: res.data.message });

                        setTimeout(() => {
                            window.location.reload(1);
                        }, 1500);
                    })
                }
            })
        }
        else {
            const formData = new FormData()
            formData.append('user', this.state.formData.user);
            formData.append('roll_number', this.state.formData.roll_number);
            formData.append('slot_number', this.state.formData.slot_number);
            formData.append('paper_link', this.state.formData.paper_link);

            Axios.post(this.state.url + "/entry/paper", formData,{ headers: head })
            .then((res) => {
                console.log(res.statusText);
                this.setState({ message: res.data.message });

                if (res.data.status === 1) {
                    Axios.post(this.state.url + "/date/bookSlot", { date: this.state.formData.slot_number })
                    .then((res) => {
                        console.log(res.data.message);
                        this.setState({ message: res.data.message });

                        setTimeout(() => {
                            window.location.reload(1);
                        }, 1500);
                    })
                }
            })
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
                    <form onSubmit={this.formSubmit} encType="multipart/form-data" >
                        <label htmlFor="name">
                            <div className="label-title">
                                Name <span className="red-star">*</span>
                            </div>
                            <input
                                type="text"
                                id="name"
                                name="user"
                                value={this.state.formData.user}
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
                                value={this.state.formData.roll_number}
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
                                type="file"
                                name="paper_link"
                                id="pdf"
                                accept=".pdf"
                                placeholder="Research paper"
                                onChange={this.fileHandler}
                            />
                        </label> <br />
                        <input type="submit" className="submit" />
                        <div style={{ color: "green" }}> {this.state.message} </div>
                    </form>
                    :
                    <div> Loading... </div>
                }
            </div>
        );
    }
}
