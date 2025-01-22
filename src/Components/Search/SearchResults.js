import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import '../../Styles/SearchBar.css'

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 9;

    // Games data (frontend only)
    const games = [
        { id: 1, name: 'Roulette', type: 'game', path: '/roulette' },
        { id: 2, name: 'Dice', type: 'game', path: '/dice' },
        { id: 3, name: 'Coin Flip', type: 'game', path: '/coin-flip' },
    ];

    // Fetch search results when the query changes
    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            try {
                // Search for users
                const usersResponse = await axios.get(`http://localhost:8080/search/users?query=${query}`);
                const users = usersResponse.data.map((user) => ({ ...user, type: 'user' }));

                // Search for games
                const filteredGames = games.filter((game) =>
                    game.name.toLowerCase().includes(query.toLowerCase())
                );

                setResults([...users, ...filteredGames]);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [query]);

    // Pagination logic
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="search-results">
            <h2>Search Results for "{query}"</h2>
            <div className="results-grid">
                {currentResults.map((result) => (
                    <Link
                        key={result.id}
                        to={result.type === 'user' ? `/profile/${result.username}` : result.path}
                        className="result-item"
                    >
                        {result.type === 'user' ? `👤 ${result.username}` : `🎮 ${result.name}`}
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(results.length / resultsPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;