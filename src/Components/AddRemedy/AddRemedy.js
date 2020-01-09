import React from 'react'
import './AddRemedy.css'
import config from '../../config'
import Context from '../../Context'
import { Link } from 'react-router-dom'

export default class AddRemedy extends React.Component {

    render() {

        let header = this.props.noHeader ? <header>
                                                <h1 className="malady-page-header">Add Remedy</h1>
                                            </header>
                                            :
                                            <header className="add-page-header">
                                                <h1>Add Remedy</h1>
                                            </header>
        return (
            
            <div className='add-page'>
                {header}
                <form id="new-remedy-form">
                    <label htmlFor='malady'>Malady</label><br />
                    <input
                        type='text'
                        id='malady'
                       >
                    </input>

                    <label htmlFor='remedy'>Remedy Name</label><br />
                    <input
                        type='textarea'
                        id="remedy"
                        >
                    </input><br />

                    <label htmlFor='description'>Description</label><br />
                    <textarea
                        type='text'
                        id="description"
                        cols="30"
                        rows="10"
                        
                    ></textarea><br />

                    <label htmlFor='reference'>Reference</label><br />
                    <input
                        type='text'
                        id="reference"
                    ></input><br />

                    <button
                        type="submit"
                        className="login-button">
                        Add
                    </button>


                </form>

            </div>
        )
    }
}