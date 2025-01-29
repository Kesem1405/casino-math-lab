import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import '../../Styles/SearchBar.css';
import NoAvatar from '../../Media/images/Avatars/NoAvatar.png';
import { SearchLanguageData } from '../../Language/LanguageData'; // Import language data
import { GameSearchResults } from '../../Constants/Constants';

const SearchResults = ({ language, currentUserUsername }) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [friendRequestStatus, setFriendRequestStatus] = useState({}); // Track friend request status
    const resultsPerPage = 9;

    // Fetch search results when the query changes
    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            try {
                // Search for users
                const usersResponse = await axios.get(`http://localhost:8080/users/search?query=${query}`);
                const users = usersResponse.data.map((user) => ({ ...user, type: 'user' }));

                // Filter games based on the query
                const filteredGames = GameSearchResults.filter((game) =>
                    game.name.toLowerCase().includes(query.toLowerCase())
                );

                // Combine users and games into a single results array
                setResults([...users, ...filteredGames]);

                // Fetch friend request status for each user
                const statusPromises = users.map(async (user) => {
                    if (user.type === 'user' && user.username !== currentUserUsername) {
                        const response = await axios.get(
                            `http://localhost:8080/users/check-friend-request?senderUsername=${currentUserUsername}&receiverUsername=${user.username}`
                        );
                        return { username: user.username, status: response.data.exists };
                    }
                    return null;
                });

                const statusResults = await Promise.all(statusPromises);
                const statusMap = statusResults.reduce((acc, result) => {
                    if (result) {
                        acc[result.username] = result.status;
                    }
                    return acc;
                }, {});

                setFriendRequestStatus(statusMap);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [query, currentUserUsername]);

    const handleAddFriend = async (receiverUsername) => {
        try {
            await axios.post('http://localhost:8080/users/send-friend-request', {
                senderUsername: currentUserUsername,
                receiverUsername,
            });

            // Update the friend request status
            setFriendRequestStatus((prevStatus) => ({
                ...prevStatus,
                [receiverUsername]: true,
            }));

            alert('Friend request sent!');
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    // Pagination logic
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="content">
            <div className="container">
                <h2>{SearchLanguageData[language].searchResultsFor} "{query}"</h2> {/* Dynamic heading */}
                <div className="results-grid">
                    {currentResults.map((result) => (
                        <Link
                            to={result.type === 'user' ? `/profile/${result.username}` : result.path}
                            key={result.id}
                            className="user-result"
                        >
                            <div className="card-box">
                                <div className="member-card pt-2 pb-2">
                                    {result.type === 'user' ? (
                                        <>
                                            <div className="thumb-lg member-thumb mx-auto">
                                                <img
                                                    src={result.avatar || NoAvatar}
                                                    className="rounded-circle img-thumbnail"
                                                    alt="profile-image"
                                                />
                                            </div>
                                            <div className="result-username">
                                                <h4>{result.username}</h4>
                                                <p className="text-muted">
                                                    {result.firstName} {result.lastName}
                                                </p>
                                            </div>
                                            {result.username !== currentUserUsername && (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddFriend(result.username);
                                                    }}
                                                    style={{
                                                        backgroundColor: friendRequestStatus[result.username] ? 'green' : '',
                                                    }}
                                                >
                                                    {friendRequestStatus[result.username]
                                                        ? SearchLanguageData[language].requestSent // Use "Pending Request" or equivalent from language data
                                                        : SearchLanguageData[language].addFriend}
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="thumb-lg member-thumb mx-auto">
                                                <img
                                                    src={result.image}
                                                    className="rounded-circle img-thumbnail"
                                                    alt={result.name}
                                                />
                                            </div>
                                            <div className="result-username">
                                                <h4>{result.name}</h4>
                                                <p className="text-muted">Game</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="row">
                    <div className="col-12">
                        <div className="text-right">
                            <ul className="pagination pagination-split mt-0 float-right">
                                {Array.from({ length: Math.ceil(results.length / resultsPerPage) }, (_, i) => (
                                    <li
                                        key={i + 1}
                                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                    >
                                        <button className="page-link" onClick={() => paginate(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;