import React from 'react'
import './MaladyList.css'
import { Link } from 'react-router-dom'
import Context from '../../Context'
import { getNumOfRemedies } from '../../helperFunctions'

export default class MaladyList extends React.Component {

    constructor(props){
        super(props)
    }
    static contextType = Context;



    render() {

        const alphMal = this.context.maladies.sort((a, b) => (a.malady_name > b.malady_name) ? 1 : -1)
        
        const allMaladies = alphMal
            .map(malady => <Link to={`/malady/${malady.id}`}
                                key={malady.id}
                                prop={malady}
                                className="browse-maladies-link">

                            {malady.malady_name}

                            <span className="remedies-counter">{getNumOfRemedies(this.context.remedies, malady.id).length + " Remedies"}</span>
                        </Link>)
        
        return (

            <div className='malady-page'>

                <header className="malady-head">
                    <section className="border-box">
                    <h1>Maladies</h1>
                    </section>
                </header>

                <section className="browse-maladies-section">
                    {allMaladies}
                </section>

            </div>
        )
    }
}