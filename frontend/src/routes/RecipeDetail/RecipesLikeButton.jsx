import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RecipeLikeButton({ recipeId }) {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        // Fetch the current likes when the component loads
        const fetchLikes = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`);
                if (response.ok) {
                    const data = await response.json();
                    setLikes(data.likes);
                }
            } catch (error) {
                console.error('Error fetching initial likes:', error);
            }
        };
        fetchLikes();
    }, [recipeId]);

    const handleLikeClick = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setLikes(data.likes); // Update likes with the new value from the response
            } else {
                console.error(`Failed to increment likes: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error incrementing likes:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLikeClick}>Like</button>
            <p>Likes: {likes}</p>
        </div>
    );
}

RecipeLikeButton.propTypes = {
    recipeId: PropTypes.number.isRequired,
};

export default RecipeLikeButton;