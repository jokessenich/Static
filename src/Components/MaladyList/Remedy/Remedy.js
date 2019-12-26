import React from 'react'
import './Remedy.css'
import Context from '../../../Context'
import config from '../../../config'

export default class Remedy extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            feedback: false,
            liked: null, 
            likeId: "",
            likes: 0,
            dislikes: 0
        }
    }

    static contextType=Context

    componentDidMount=()=>{
        if(this.context.isLoggedIn){
        fetch(`${config.API_ENDPOINT}/likes/${localStorage.getItem('token')}/getbyrem/${this.props.rem.id}`)
        .then(res=>{
            if(!res.ok){
                return res.json()
                .then(error=>{
                    throw error
                })
            }
        return res.json()})

        .then(data=>{
            console.log(data)
            this.setState({
                liked: data.like.liked,
                likeId: data.like.id,
                feedback: true
        })})

        .catch(error=>console.log(error))
    }
        
        const likesForRemedy = this.context.likes.filter(likes=> likes.remedyid===this.props.rem.id&&likes.liked===true)
        const dislikesForRemedy = this.context.likes.filter(likes=> likes.remedyid===this.props.rem.id&&likes.liked===false)
        
        this.setState({
            likes: likesForRemedy.length,
            dislikes: dislikesForRemedy.length
        })

}

    handleLike=(newStatus)=>{
        if(!this.context.isLoggedIn)
         {
             console.log('Error on Like')
             return;
         }

         if(this.state.feedback === false){
        fetch(`${config.API_ENDPOINT}/likes/${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"remedyid": "${this.props.rem.id}",
                        "liked": "${newStatus}"
                    }`
        })

        .then(res=> res.json())

        .then(res=> {
            this.setState({
                liked: newStatus
            })
        })

        .then(res=>window.location.reload())
    }
        
        else{
            fetch(`${config.API_ENDPOINT}/likes/${localStorage.getItem('token')}/${this.state.likeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{"remedyid": "${this.props.rem.id}",
                            "liked": "${newStatus}"
                        }`
            })

            .then(res=> {
                console.log(res)
                this.setState({
                    liked: newStatus
                })
            })
    
            .then(res=>window.location.reload())
        }
        }
    

    createLikeButton=()=>{

        if(this.state.liked === null){
            return <div>
                <button 
                    type= "button"
                    onClick={()=>this.handleLike(true)}>
                        like
                    </button>

                <button 
                    type= "button"
                    onClick={()=>this.handleLike(false)}>
                        dislike
                    </button>
                </div>
        }

           else if(this.state.liked === true){
            return <div>
                <button 
                    className="liked"
                    type= "button"
                    onClick={()=>this.handleLike(null)}>
                        like
                    </button>

                <button 
                    type= "button"
                    onClick={()=>this.handleLike(false)}>
                        dislike
                    </button>
            </div>
        }

        else if(this.state.liked === false){
            return <div>
                <button 
                    type= "button"
                    onClick={()=>this.handleLike(true)}>
                        like
                    </button>

                <button 
                    className="disliked"
                    type= "button"
                    onClick={()=>this.handleLike(null)}>
                        dislike
                    </button>
            </div>
        }
    }

    render(){
        
        const likeIt= this.context.isLoggedIn?this.createLikeButton:()=>""
        return(
    
                        <div className="remedy-section">
                            <h2>{this.props.rem.remedy_name}</h2>

                            <p>{this.props.rem.remedy_description}</p>
                            {likeIt()}
                            <p>Likes: {this.state.likes}</p>
                            <p>Dislikes: {this.state.dislikes}</p>
                        </div>
        )
    }
}