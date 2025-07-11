const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;


export const addBookToLib = async ( userId, book ) => {
  const url = `${baseUrl}/lib/add-book`;
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

export const getMyBooksFromLib = async ( userId ) => {
  const url = `${baseUrl}/lib/my-books?uid=${encodeURIComponent(userId)}`;
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

export const removeBookFromLib = async ( userId, bookId ) => {
  const url = `${baseUrl}/lib/remove-my-book`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id: userId, book_id: bookId })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status ${res.status}`);
  }
  return await res.json(); 
}

export const updateBookProgress = async ( userId, bookId, pageNum ) => {
  const url = `${baseUrl}/lib/update-book-progress`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id: userId, book_id: bookId, page: pageNum })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || `HTTP error! status ${res.status}`);
  }
  return await res.json();  
}

export const getBooksInProgress = async ( userId ) => {
  const url = `${baseUrl}/lib/in-progress-books?uid=${encodeURIComponent(userId)}`;
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

export const getCompletedBooks = async ( userId ) => {
  const url = `${baseUrl}/lib/completed-books?uid=${encodeURIComponent(userId)}`;
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


