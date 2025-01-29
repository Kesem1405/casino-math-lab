import { useState, useEffect } from 'react';

const useBalance = (initialBalance, username) => {
    const [balance, setBalance] = useState(initialBalance);

    // Fetch the latest balance from the backend when the component mounts or when the username changes
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/get-balance?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch balance');
                }
                const data = await response.json();
                setBalance(data.balance); // Update the local state with the fetched balance
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        if (username) {
            fetchBalance();
        }
    }, [username]); // Re-fetch balance when the username changes

    const updateBalanceInBackend = async (newBalance) => {
        try {
            if(username !== null){
            console.log("Updating balance in backend:", newBalance); // Log the update
            const payload = { username: username, balance: newBalance };
            console.log("Request payload:", payload); // Log the payload

            const response = await fetch('http://localhost:8080/users/update-balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to update balance in backend');
            }

            const data = await response.json();
            console.log("Balance updated successfully:", data); // Log success
            return data.balance; // Return the updated balance from the backend
                }

        } catch (error) {
            console.error('Error updating balance:', error); // Log errors
            throw error; // Re-throw the error for handling in `updateBalance`
        }

    };

    const updateBalance = async (newBalanceOrCallback) => {
        let newBalance;
        if (typeof newBalanceOrCallback === 'function') {
            newBalance = newBalanceOrCallback(balance); // Calculate new balance using the callback
        } else {
            newBalance = newBalanceOrCallback; // Use the provided value directly
        }

        try {
            // Update the backend first
            const updatedBalance = await updateBalanceInBackend(newBalance);
            // Update the local state with the updated balance from the backend
            setBalance(updatedBalance);
        } catch (error) {
            console.error('Failed to update balance:', error);
        }
    };

    return { balance, updateBalance };
};

export default useBalance;