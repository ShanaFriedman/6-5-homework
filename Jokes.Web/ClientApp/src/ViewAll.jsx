import axios from "axios";
import { useEffect, useState } from "react";
import HomeJoke from "./HomeJoke";

const ViewAll = () => {
    const [jokes, setAllJokes] = useState([])

    useEffect(() => {
        const getAllJokes = async () => {
            const {data} = await axios.get('api/jokes/getalljokes')
            setAllJokes(data)
        }
        getAllJokes()
    },[])
    return(<><div className="row">
    <div className="col-md-6 offset-md-3">
        {jokes.map(j => <HomeJoke 
        key={j.id}
        joke={j}
        likes={j.likes}/>)}
     
    </div>
  </div></>)
}

export default ViewAll