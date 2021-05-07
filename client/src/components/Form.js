import React, { Component } from "react";

export default class Form extends Component {
    render() {
        return (
            <div className="form">
                <form>
                    <label for="id">
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
                    <div class="radio-toolbar">
                        <input type="radio" id="radioApple" name="radioFruit" value="apple" />
                        <label for="radioApple">Apple</label>

                        <input type="radio" id="radioBanana" name="radioFruit" value="banana" />
                        <label for="radioBanana">Banana</label>

                        <input type="radio" id="radioOrange" name="radioFruit" value="orange" />
                        <label for="radioOrange">Orange</label>
                    </div>
                    <br /><br />

                    <label for="pdf">
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
                    </label>
                </form>
            </div>
        );
    }
}
