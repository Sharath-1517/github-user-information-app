import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DisplayUser = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        async function getDetails() {
            try {
                const response = await fetch(`https://api.github.com/users/${userId}`);
                const data = await response.json();
                setUserData(data);
                setLoading(false); // Set loading to false when data is loaded
            } catch (error) {
                console.error('Error fetching user details:', error);
                setLoading(false); // Set loading to false even in case of error
            }
        }
        getDetails();
    }, [userId]);

    if (loading) {
        return (
            <div className="loading-icon">
                <img src='images/loading.webp' className='rotate-animation'/>
            </div>
        ); // Render loading state
    }

    if (userData.message) {
        return <div className="not_found"><p>User Does Not Exists!</p></div>
    }

    return (
        <>
            <div className="user">
                <div className="user--details">
                    <img src={userData.avatar_url} alt={userData.login} />
                    <div className="user_name">
                        <h2>UserName: </h2>
                        <p>{userData.login}</p>
                    </div>
                    <div className="user_followers_followings">
                        <div>
                            <h2>Followers:</h2>
                            <p>{userData.followers}</p>
                        </div>
                        <div>
                            <h2>Followings:</h2>
                            <p>{userData.following}</p>
                        </div>
                    </div>
                    {userData.created_at ? (
                        <div className="user_creation">
                            <h2>Signed Up on: </h2>
                            <p>{userData.created_at.slice(0, 10)}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="user_socials">
                        <h2>Socials:</h2>
                        {userData.twitter_username ? (
                            <div>
                                <h2>Twitter: </h2>
                                <p>
                                    <a href={`https://twitter.com/${userData.twitter_username}`} target='blank'>Click here</a>
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                        <div>
                            <h2>GitHub: </h2>
                            <p>
                                <a href={`${userData.html_url}`} target='blank'>Click here</a>
                            </p>
                        </div>
                        {userData.blog ? (
                            <div>
                                <h2>Blog: </h2>
                                <p>
                                    <a href={`${userData.blog}`} target='blank'>Click here</a>
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    {userData.bio ? (
                        <div className="user_bio">
                            <h2>Bio:</h2>
                            <p>{userData.bio}</p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}

export default DisplayUser;
