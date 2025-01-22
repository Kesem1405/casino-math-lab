import { createContext } from 'react';

// Define the context with default values
const defaultContextValues = {
    bets: {},  // Default bets could be an empty object (adjust based on the actual structure)
    onBetCatcherHover: () => null,  // Default function to avoid errors
};

// Create the context and provide default values
export const RouletteTableContext = createContext(defaultContextValues);
