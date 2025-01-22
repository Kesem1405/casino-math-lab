import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();

    // Games data (frontend only)
    const games = [
        { id: 1, name: 'Roulette', type: 'game', path: '/roulette' },
        { id: 2, name: 'Dice', type: 'game', path: '/dice' },
        { id: 3, name: 'Coin Flip', type: 'game', path: '/coin-flip' },
    ];

    // Fetch search results as the user types
    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            setIsDropdownVisible(false);
            return;
        }

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
                setIsDropdownVisible(true);
            } catch (error) {
                console.error('Error searching:', error);
            }
        };

        fetchResults();
    }, [query]);

    // Handle search button click
    const handleSearch = () => {
        if (query.trim() === '') return;
        navigate(`/search-results?query=${query}`);
    };

    return (
        <div className="search-bar">
            <div className="search-input">
                <input
                    type="text"
                    placeholder="Search for users or games..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsDropdownVisible(true)}
                    onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Dropdown with search results */}
            {isDropdownVisible && results.length > 0 && (
                <div className="search-dropdown">
                    {results.map((result) => (
                        <Link
                            key={result.id}
                            to={result.type === 'user' ? `/profile/${result.username}` : result.path}
                            className="search-result"
                        >
                            {result.type === 'user' ? `👤 ${result.username}` : `🎮 ${result.name}`}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;