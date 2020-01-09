import React from 'react'
import './AddMalady.css'
import config from '../../config'
import Context from '../../Context'

export default class AddMalady extends React.Component {

    static contextType = Context


    render() {
        return (

            <div className='add-malady-page'>

                <header className="add-malady-page-header">
                    <h1>Add Malady</h1>
                </header>

                <section className="add-mal-body">
                    <form className="add-mal-form" >
                        <label htmlFor='name'>Malady Name</label><br />
                        <input
                            type='list'
                            id='name'
                            >
                        </input><br />

                        <label htmlFor='symptoms'>Symptoms</label><br />
                        <textarea
                            type='text'
                            id="symptoms"
                            cols="30"
                            rows="10"
                            >
                        </textarea><br />

                        <label htmlFor='description'>Description</label><br />
                        <textarea
                            type='text'
                            id="description"
                            cols="30"
                            rows="10"
                            >
                        </textarea><br />

                        <button
                            type="submit"
                            className = "login-button">
                            Add
                    </button>
                    </form>
                </section>
            </div>
        )
    }
}