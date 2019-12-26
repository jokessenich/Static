import React from 'react'
import './Malady.css'
import Context from '../../../Context'
import Remedy from '../Remedy/Remedy'
import AddRemedy from '../../AddRemedy/AddRemedy'

export default class Malady extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showForm: false,
            showSym: true
        }
    }

    static contextType = Context

    updateForm = () => {
        console.log('clicked')
        this.setState({
            showForm: !this.state.showForm
        })
    }

    showSym = () => {
        console.log('clicked')
        this.setState({
            showSym: !this.state.showSym
        })
    }

    render() {
        const remedy = this.context.remedies.filter(remedy => remedy.remedy_malady === parseInt(this.props.match.params.id))
        const malady = this.context.maladies.filter(malady => malady.id === parseInt(this.props.match.params.id))
        const maladyPage = malady.map(malady => <div className="malady-section" key={malady.id}>
                                            <header className="malady-page-head">
                                                <h1>{malady.malady_name}</h1>
                                                <p>{malady.malady_description}</p>
                                                <h2 onClick={this.showSym}>Symptoms</h2>

                                            </header>
                                            <section className="malady-subsection">
                                            <p>{this.state.showSym && malady.malady_symptoms}</p>

                                            </section>
                                        </div>)

        const remedyPage = remedy.map(remedy => <Remedy rem={remedy} key={remedy.id}></Remedy>)

        return (
            <div className='malady-page'>


                {maladyPage}

                <section className = "remedies-header">
                <h1>Remedies</h1>
                </section>
                {this.state.showForm && <AddRemedy></AddRemedy>}
                <h2 onClick={this.updateForm}>Click to Add Remedy</h2>
                {remedyPage}
            </div>
        )
    }
}