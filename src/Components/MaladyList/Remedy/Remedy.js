import React from 'react'
import './Remedy.css'
import Context from '../../../Context'
import config from '../../../config'

export default class Remedy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            feedback: false,
            liked: null,
            likeId: "",
            likes: 0,
            dislikes: 0,
            createdRem: [],
            error: ""
        }
    }

    static contextType = Context

    
    render() {
        const deleteIt = this.state.createdRem.length === 0 ? "" : <button onClick={this.handleDelete}>Delete</button>
        const likeIt =  <div>
                            <span className="likes-count">{this.state.likes}</span>
                                <img src="https://img.icons8.com/office/40/000000/good-quality.png" 
                                    className="like-button"
                                    height="40px"
                                    onClick={()=>this.setState({error:"Must be logged in to give feedback"})}
                                    alt="thumbs up icon" />

                            <span className="likes-count">{this.state.dislikes}</span>
                                <img src="https://img.icons8.com/officel/40/000000/poor-quality.png" 
                                    className="like-button"
                                    height="40px"
                                    onClick={()=>this.setState({error:"Must be logged in to give feedback"})}
                                    alt="thumbs down icon" />
                        </div>
                                                                                                            
        return (

            <div className="remedy-section">
                <h2>{this.props.rem.remedy_name}</h2>

                <p>{this.props.rem.remedy_description}</p>
                {likeIt}
                <p className ="feedback-error">{this.state.error}</p>
                {deleteIt}
                <p>Reference: {this.props.rem.remedy_reference}</p>
                <p>--</p>
            </div>
        )
    }
}