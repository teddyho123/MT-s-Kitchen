import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RecipeLikeButton({ recipeId }) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

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
            const url = isLiked 
                ? `http://127.0.0.1:8000/recipes/${recipeId}/unlike`
                : `http://127.0.0.1:8000/recipes/${recipeId}/like`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setLikes(data.likes); // Update likes with the new value from the response
                setIsLiked(!isLiked);
            } else {
                console.error(`Failed to increment likes: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error incrementing likes:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLikeClick}>{isLiked ? 'Unlike' : 'Like'}</button>
            <p>Likes: {likes}</p>
        </div>
    );
}

RecipeLikeButton.propTypes = {
    recipeId: PropTypes.number.isRequired,
};

export default RecipeLikeButton;