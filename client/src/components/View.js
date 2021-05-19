import React, { Component } from "react";
import Axios from "axios";

export default class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "https://biometrics-slot-booking.herokuapp.com",
            // url: "http://localhost:3001",
            studentsData: {},
            fetchedStudentsData: false,
        }
    }

    /**************** Fetch dates and slots *******************/

    fetchStudentDetails = () => {
        Axios.get(this.state.url + "/entry/view")
            .then((res) => {
                this.setState({
                    studentsData: res.data,
                    fetchedStudentsData: true
                });
            })
    }

    componentDidMount = () => {
        this.fetchStudentDetails();
    }


    render() {
        return (
            <>
                {!this.state.fetchedStudentsData
                    ?
                    <div>Loading ... </div>
                    :
                    <table className="view">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll number</th>
                                <th>Booked slot</th>
                                <th>Selected research paper</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Object.keys(this.state.studentsData).map((keyName, i) => {
                                let data = this.state.studentsData[keyName];

                                return (
                                    <tr key={i}>
                                        <td>{data.user}</td>
                                        <td>{data.roll_number}</td>
                                        <td>{data.slot_number}</td>
                                        <td>
                                            {data.paper_link !== null
                                                ?
                                                <a href={`${this.state.url}/entry/pdf/${data.paper_link}`}>View Paper</a>
                                                :
                                                <>No paper </>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </table>
                }
            </>

        );
    }
}
