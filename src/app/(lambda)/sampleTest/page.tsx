"use client"
import React, { useState, useEffect } from 'react';

const BookDisplay = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://9yu2rt5n2j.execute-api.ap-northeast-2.amazonaws.com/test/test/api/getName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}) // Sending an empty JSON object
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const booksData = JSON.parse(result.body); // Parse the 'body' field of the response
                console.log(booksData);
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="text-center text-xl font-semibold mt-5">Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Books</h1>
            <ul className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {books.map((book, index) => (
                    <li key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                        <strong className="text-lg text-black font-medium">{book.title}</strong>
                        <span className="block text-sm text-gray-600">{book.price}</span>
                        <span className={`block text-sm ${book.availability.includes('In stock') ? 'text-green-500' : 'text-red-500'}`}>
                            {book.availability}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookDisplay;
