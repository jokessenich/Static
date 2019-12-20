import React from 'react'
import './Malady.css'
import Context from '../../../Context'
import Remedy from '../Remedy/Remedy'

export default class Malady extends React.Component {

    constructor(props) {
        super(props)
    }

    static contextType = Context
    
    

    render() {
        const remedy = this.context.remedies.filter(remedy => remedy.remedy_malady === parseInt(this.props.match.params.id))
        const malady = this.context.maladies.filter(malady => malady.id === parseInt(this.props.match.params.id))
        const maladyPage = malady.map(malady => <div className="malady-section" key={malady.id}>
                            <h1>{malady.malady_name}</h1>

                            <section className="malady-subsection">
                                <h2>Symptoms: {malady.malady_symptoms}</h2>
                                <h4>{malady.malady_name}- {malady.malady_description}</h4>
                            </section>
                        </div>)

        const remedyPage = remedy.map(remedy => <Remedy rem={remedy} key = {remedy.id}></Remedy>)

        return (
            <div className='malady-page'>
                {maladyPage}
                <h1>Remedies</h1>
                {remedyPage}
            </div>
        )
    }
}