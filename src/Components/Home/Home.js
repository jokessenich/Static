import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import Context from '../../Context'

export default class Home extends React.Component {


    static contextType = Context


    render() {

        
        return (

            <div className="home-page">

                <section className="home-search">
                    <h1 className = "home-hero">Alternative Remedies for the People.{<br />} <span className = "subheader-home">By the People.</span></h1>
                    
                    <form id = 'home-search-form'>
                        <input type='text' 
                                id='home-search-term' 
                                placeholder = "Find a condition. e.g. 'Flu'"
                                >
                                </input>


                        <button
                            type='submit'
                            id = 'search-button'
                            ></button>
                    </form>

                    

                </section>

                <section className="app-explain">
                    <p>OurHealth allows you to find and share the best alternative and natural remedies.</p>
                </section>

            </div>
        )
    }
}

