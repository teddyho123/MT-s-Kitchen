import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RecipeLikeButton({ recipeId }) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const userId = parseInt(localStorage.getItem("userId"), 10);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                if (isNaN(userId)) {
                    const likesResponse = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`);
                    if (likesResponse.ok) {
                    const data = await likesResponse.json();
                    setLikes(data.likes);
                }
                return;}
                const response = await fetch(`http://127.0.0.1:8000/user/${userId}/liked-recipes`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch liked recipes: ${response.statusText}`);
                }
                const likedRecipes = await response.json();
                if (Array.isArray(likedRecipes) && likedRecipes.some(r => r.id === recipeId)) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
                const likesResponse = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`);
                if (likesResponse.ok) {
                    const data = await likesResponse.json();
                    setLikes(data.likes);
                }
            } catch (error) {
                console.error("Error fetching initial like status:", error);
            }
        };

        fetchLikeStatus();
    }, [recipeId, userId]);

    const handleLikeClick = async () => {
        if (isNaN(userId)) {
            alert("Please log in to like recipes.");
            return;
        }
        try {
            const url = isLiked 
                ? `http://127.0.0.1:8000/recipes/${recipeId}/unlike?user_id=${localStorage.getItem("userId")}`
                : `http://127.0.0.1:8000/recipes/${recipeId}/like?user_id=${localStorage.getItem("userId")}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.detail === "Already liked recipe") {
                    alert("Already liked recipe"); // Display alert if already liked
                } else {
                    throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} recipe: ${errorData.detail}`);
                }
            } else {
                const data = await response.json();
                setLikes(data.likes);
                setIsLiked(!isLiked); // Toggle like state
            }
        } catch (error) {
            console.error("Error updating likes:", error);
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