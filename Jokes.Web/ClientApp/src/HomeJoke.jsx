
const HomeJoke = ({joke, likes}) => {
    console.log(joke)
    console.log(likes)
    return(<><div className="card card-body bg-light mb-3">
    <h5>{joke.setup}</h5>
    <h5>{joke.punchline}</h5>
    <span>Likes: {joke.likes.filter(l => l.liked === true).length}</span>
    <br />
    <span>Dislikes: {joke.likes.filter(l => l.liked === false).length} </span>
  </div></>)
}

export default HomeJoke