import React, { useState } from 'react'

const Home = () => {

    const [userName, setUserName] = useState({
        username: ""
    });

    function onChageEventHandler(event) {
        const {name, value} = event.target;
        setUserName(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const {username} = userName;
        window.location.href = `/userDetails?userId=${username}`
    }

  return (
    <div className='home'>
        <form action="/userDetails" onSubmit={submitHandler} className='home--form container'>
            <h1>GitHub User Details Finder</h1>
            <input type="text" name='username' id='username' onChange={onChageEventHandler} required placeholder='Try it...'/>
            <button>Get user details</button>
        </form>
    </div>
  )
}

export default Home