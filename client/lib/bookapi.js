const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

/***********************************************************
 * Searches for books by name.
 * @param {string} bookname - The name of the book to search for.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of book objects.
 * @throws {Error} If the network response is not ok.
 **********************************************************/
export const search = async (bookname, uid) => {
  const url = `${baseUrl}/search?bookname=${encodeURIComponent(bookname)}&uid=${encodeURIComponent(uid)}`;
  const res = await fetch(url, {
    method: 'GET', 
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status: ${res.status}`);
  }
  return await res.json();
};


/***********************************************************
 * Adds a search item to the recent searches list on the server.
 * @param {string} searchItem - The search term to add.
 * @returns {Promise<Object>} A promise that resolves to the server's response (e.g., a success message).
 * @throws {Error} If the network response is not ok.
 **********************************************************/
export const recentSearches = async (searchItem, uid) => {
  const url = `${baseUrl}/recent-searches`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ search_item: searchItem, uid: uid })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status ${res.status}`);
  }
  return await res.json();
}


/***********************************************************
 * Retrieves the list of recent searches from the server.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of recent search terms.
 * @throws {Error} If the network response is not ok.
 **********************************************************/
export const getRecentSearches = async (uid) => {
  const url = `${baseUrl}/recent-searches?uid=${encodeURIComponent(uid)}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status ${res.status}`);
  }
  return await res.json();
}


/***********************************************************
 * Adds a book to a user's favorites list.
 * @param {string} userId - The ID of the user.
 * @param {Object} book - The book object to add to favorites.
 * @returns {Promise<Object>} A promise that resolves to the server's response.
 * @throws {Error} If the network response is not ok.
 **********************************************************/
export const addToFavorites = async (userId, book) => {
  const url = `${baseUrl}/book/add-to-favorite`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
       "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id: userId, book: book })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status ${res.status}`);
  }
  return await res.json();
}


/***********************************************************
 * Updates the favorite status of a book for a user (e.g., removes it or sets its 'is_favorite' to false).
 * This function uses PATCH to partially update the resource.
 * @param {string} userId - The ID of the user.
 * @param {string} bookId - The ID of the book to update.
 * @param {boolean} isFavorite - The new favorite status (e.g., false to remove).
 * @returns {Promise<Object>} A promise that resolves to the server's response.
 * @throws {Error} If the network response is not ok.
 **********************************************************/
export const removeFromFavorites = async (userId, bookId, isFavorite) => {
  const url = `${baseUrl}/book/remove-favorite`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
       "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id: userId, book_id: bookId, is_favorite: isFavorite })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status ${res.status}`);
  }
  return await res.json();
}


/*********************************************************
 * Retrieves all favorite books for a given user.
 * @param {string} userId - The ID of the user whose favorites are to be fetched.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of favorite book objects.
 * @throws {Error} If the network response is not ok.
 *********************************************************/
export const getMyFavoriteBooks = async (userId) => {
  const url = `${baseUrl}/book/get-favorites?uid=${encodeURIComponent(userId)}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
       "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status ${res.status}`);
  }
  return await res.json(); 
}