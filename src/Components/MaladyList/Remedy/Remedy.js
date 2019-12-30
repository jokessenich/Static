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
            createdRem: []
        }
    }

    static contextType = Context

    componentDidMount = () => {

        //If the user is logged in, get the users likes
        if (this.context.isLoggedIn) {
            fetch(`${config.API_ENDPOINT}/likes/${localStorage.getItem('token')}/getbyrem/${this.props.rem.id}`)
                .then(res => {
                    if (!res.ok) {
                        return res.json()
                            .then(error => {
                                throw error
                            })
                    }
                    return res.json()
                })

                .then(data => {
                    this.setState({
                        liked: data.like.liked,
                        likeId: data.like.id,
                        feedback: true
                    })
                })

                .catch(error=>{
                    this.props.history.push('/ErrorPage')
                })
        }

        if (this.context.isLoggedIn) {
            fetch(`${config.API_ENDPOINT}/remedies/user/${localStorage.getItem('token')}`)
                .then(remedies => remedies.json())
                .then(remedies => {
                    const createdRem = remedies.filter(rem => rem.id === this.props.rem.id)
                    this.setState({
                        createdRem: createdRem
                    })
                })
        }
        //get the likes for the remedy from the context
        const likesForRemedy = this.context.likes.filter(likes => likes.remedyid === this.props.rem.id && likes.liked === true)
        const dislikesForRemedy = this.context.likes.filter(likes => likes.remedyid === this.props.rem.id && likes.liked === false)

        this.setState({
            likes: likesForRemedy.length,
            dislikes: dislikesForRemedy.length
        })



    }

    handleLike = (newStatus) => {
        if (!this.context.isLoggedIn) {
            return;
        }

        if (this.state.feedback === false) {
            fetch(`${config.API_ENDPOINT}/likes/${localStorage.getItem('token')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{"remedyid": "${this.props.rem.id}",
                        "liked": "${newStatus}"
                    }`
            })

                .then(res => res.json())

                .then(res => {
                    this.setState({
                        liked: newStatus
                    })
                })

                .then(res => window.location.reload())
        }

        else {
            fetch(`${config.API_ENDPOINT}/likes/${localStorage.getItem('token')}/${this.state.likeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{"remedyid": "${this.props.rem.id}",
                            "liked": "${newStatus}"
                        }`
            })

                .then(res => {
                    if(!res.ok){
                        return res.json()
                        .then(error=>{
                            throw error
                        })
                    }
                    this.setState({
                        liked: newStatus
                    })
                })

                .then(res => window.location.reload())

                .catch(error=> this.props.history.push('/ErrorPage'))
        }
    }


    createLikeButton = () => {

        if (this.state.liked === null) {
            return <div className="like-bar">
                <span className="likes-count">{this.state.likes}</span>
                <img src="https://img.icons8.com/office/40/000000/good-quality.png" 
                    className="like-button"
                    onClick={() => this.handleLike(true)}
                    className="like-button"
                    height="40px"
                    alt="unrated remedy thumbs up icon">
                </img>

                <span className="likes-count">{this.state.dislikes}</span>
                <img src="https://img.icons8.com/officel/40/000000/poor-quality.png" 
                    className="like-button"
                    onClick={() => this.handleLike(false)}
                    height="40px"
                    alt="unrated remedy thumbs down icon">   
                    </img>
            </div>
        }

        else if (this.state.liked === true) {
            return <div className="like-bar">
                <span className="likes-count">{this.state.likes}</span>
                <img src="https://img.icons8.com/office/40/000000/good-quality.png"
                    onClick={() => this.handleLike(null)}
                    className="liked"
                    height="40px"
                    alt="already liked remedy thumbs up icon">
                </img>

                <span className="likes-count">{this.state.dislikes}</span>
                <img src="https://img.icons8.com/officel/40/000000/poor-quality.png" 
                    className="like-button"
                    onClick={() => this.handleLike(false)}
                    height="40px"
                    alt="already liked remedy thumbs down icon">                        
                    </img>
            </div>
        }

        else if (this.state.liked === false) {
            return <div className="like-bar">
                <span className="likes-count">{this.state.likes}</span>
                <img src="https://img.icons8.com/office/40/000000/good-quality.png" 
                    className="like-button"
                    onClick={() => this.handleLike(true)}
                    className="like-button"
                    height="40px"
                    alt="already disliked thumbs up icon">
                </img>

                <span className="likes-count">{this.state.dislikes}</span>
                <img src="https://img.icons8.com/officel/40/000000/poor-quality.png" 
                    className="disliked"
                    onClick={() => this.handleLike(null)}
                    height="40px"
                    alt="already disliked thumbs down icon">
                    </img>

            </div>
        }
    }

    handleDelete=()=>{
        fetch(`${config.API_ENDPOINT}/remedies/remedy/${this.props.rem.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res=>window.location.reload())
        }

    render() {
        const deleteIt = this.state.createdRem.length === 0 ? "" : <button onClick={this.handleDelete}>Delete</button>
        const likeIt = this.context.isLoggedIn ? this.createLikeButton : () => ""
        return (

            <div className="remedy-section">
                <h2>{this.props.rem.remedy_name}</h2>

                <p>{this.props.rem.remedy_description}</p>
                {likeIt()}
                {deleteIt}
                <p>Reference: {this.props.rem.remedy_reference}</p>
                <p>--</p>
            </div>
        )
    }
}