import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/SearchBar.css';
import { SearchLanguageData } from '../../Constants/Language/LanguageData'; // Import language data.
import NoAvatar from '../../Media/images/Avatars/NoAvatar.png';

const SearchBar = ({ language, isMenuOpen }) => {
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
                const usersResponse = await axios.get(`https://casino-math-lab-backend.onrender.com/users/search?query=${query}`);
                const users = usersResponse.data.map((user) => ({ ...user, type: 'user' }));

                const filteredGames = games.filter((game) =>
                    game.name.toLowerCase().includes(query.toLowerCase())
                );

                setResults([...users, ...filteredGames]);
                setIsDropdownVisible(users.length > 0 || filteredGames.length > 0);
            } catch (error) {
                console.error('Error searching:', error);
                setResults([]);
                setIsDropdownVisible(false);
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
        <div className={`search-bar ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="search-input">
                <input
                    type="text"
                    placeholder={SearchLanguageData[language].searchPlaceholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsDropdownVisible(true)}
                    onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
                />
                <button onClick={handleSearch}>{SearchLanguageData[language].searchButton}</button>
            </div>

            {/* Dropdown with search results */}
            {isDropdownVisible && results.length > 0 && (
                <div className="search-dropdown">
                    {results.slice(0, 5).map((result) => (
                        <div key={result.id} className="search-result">
                            {result.type === 'user' ? (
                                <Link to={`/profile/${result.username}`} className="user-result">
                                    <img
                                        src={result.avatar || NoAvatar}
                                        alt="profile"
                                        className="profile-pic"
                                    />
                                    <div className="user-info">
                                        <span className="username">{result.username}</span>
                                    </div>
                                </Link>
                            ) : (
                                <Link to={result.path} className="game-result">
                                    🎮 {result.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;