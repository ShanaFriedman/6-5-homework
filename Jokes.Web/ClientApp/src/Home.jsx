import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"
import { Link } from "react-router-dom"

const Home = () => {
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [joke, setJoke] = useState({
        id: '',
        jokeId: '',
        setup: '',
        punchline: '',
        likes: []
    })

    const getJoke = async () => {

        const { data } = await axios.get('/api/jokes/getjoke')
        setJoke(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getJoke()
    }, [])

    const onLikeClick = async (likeOrDislike) => {
        const l = {
            jokeId: joke.id,
            liked: likeOrDislike
        }
        const {data} = await axios.post('/api/jokes/addlikeordislike', l)
        setJoke(data)
    }
    if(isLoading){
        return(<><div
            className="row"
            style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
        >
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h1>Loading...</h1>
            </div>
        </div></>)
    }

    return (<><div
        className="row"
        style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
    >
        <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
            <div>
                <h4>
                    {joke.setup}
                </h4>
                <h4>
                    {joke.punchline}
                </h4>
                <div>
                    {!user && <div>
                        <Link to="/login">
                            Login to your account to like/dislike this joke
                        </Link>
                    </div>}
                    <div>
                        {user && <><button
                            className="btn btn-primary"
                            onClick={() => onLikeClick(true)}
                            disabled={joke.likes.some(l => l.userId === user.id && l.liked === true)}
                        >
                            Like
                        </button>
                            <button className="btn btn-danger" onClick={() => onLikeClick(false)}
                                disabled={joke.likes.some(l => l.userId === user.id && l.liked === false)}
                            >
                                Dislike
                            </button></>}
                    </div>
                    <br />
                    <h4>Likes: {joke.likes.filter(l => l.liked === true).length}</h4>
                    <h4>Dislikes: {joke.likes.filter(l => l.liked === false).length}</h4>
                    <h4>
                        <button className="btn btn-link" onClick={() => {window.location.reload()}} >
                            Refresh
                        </button>
                    </h4>
                </div>
            </div>
        </div>
    </div></>)
}
export default Home