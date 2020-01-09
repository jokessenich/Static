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
            showSym: true,
            error: ""
        }
    }

    static contextType = Context

    updateForm = () => {
        this.context.isLoggedIn?
        this.setState({
            showForm: !this.state.showForm
        }):
        this.setState({
            error: "Must be logged in to add a remedy"
        })
    }


    render() {
        const remedy = this.context.remedies.filter(remedy => remedy.remedy_malady === parseInt(this.props.match.params.id))
        const malady = this.context.maladies.filter(malady => malady.id === parseInt(this.props.match.params.id))
        const maladyPage = malady.map(malady => <div className="malady-section" key={malady.id}>

                                                    <header className="malady-page-head">
                                                        <div className="mal-head-box">
                                                            <h1>{malady.malady_name}</h1>
                                                            <p>{malady.malady_description}</p>
                                                        </div>
                                                    </header>

                                                    <section className="malady-subsection">
                                                        <h2 className="symptoms-label" onClick={this.showSym}>Symptoms</h2>
                                                        <p>{this.state.showSym && malady.malady_symptoms}</p>
                                                    </section>
                                                    
                                                </div>)

        const remedyPage = remedy.length !== 0 ? remedy.map(remedy => <Remedy 
                                                                        rem={remedy} 
                                                                        key={remedy.id}>
                                                                        </Remedy>) 
                                                                        :
                                                                    <p className ="no-remedies">
                                                                        There are no remedies for this condition yet.
                                                                        </p>

        return (
            <div className='malady-page'>


                {maladyPage}

                <section className="remedies-header">
                    <h1>Remedies</h1>
                </section>

                <section className="remedy-page">
                    {this.state.showForm && <AddRemedy noHeader={true}></AddRemedy>}
                    <p className="click-to-add" onClick={this.updateForm}>Click to {this.state.showForm ? "collapse form" : "add remedy"}</p>
                    <p className="add-error">{this.state.error}</p>
                    {remedyPage}
                </section>
            </div>
        )
    }
}