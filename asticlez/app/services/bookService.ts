// services/bookService.ts

export const fetchBooks = async () => {
  try {
    const response = await fetch('https://api.example.com/books'); // Replace with your real API URL
    const data = await response.json();
    return data; // Ensure the API returns image URLs
  } catch (error) {
    console.error('Error fetching book data:', error);
    return [];
  }
};
