import React, { useState, useEffect } from "react";
 

const SearchAPIComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]); // Always initialize as an empty array

  // Fetch data from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data); // Set the fetched data to users state
      })
      .catch((error) => {
        console.error("Error fetching the data: ", error);
      });
  }, []);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Conditional Rendering to avoid undefined error */}
      {users && users.length > 0 ? (
        <ul>
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter users by name
            )
            .map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
        </ul>
      ) : (
        <p>Loading users...</p> // Loading message until data is fetched
      )}
    </div>
  );
};

export default SearchAPIComponent;
