
import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from '../lib/utils'

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Create optimized search index for faster filtering
  const searchIndex = useMemo(() => {
    const index = new Map<string, Set<number>>();

    users.forEach(user => {
      // Extract all searchable terms
      const terms = [
        user.name.toLowerCase(),
        user.username.toLowerCase(),
        user.email.toLowerCase(),
        user.company.name.toLowerCase()
      ];

      // For each term, add to our index
      terms.forEach(term => {
        // Handle each word in the term
        term.split(/\s+/).forEach(word => {
          // Index by prefix
          for (let i = 1; i <= word.length; i++) {
            const prefix = word.substring(0, i);
            if (!index.has(prefix)) {
              index.set(prefix, new Set());
            }
            index.get(prefix)?.add(user.id);
          }
        });
      });
    });

    return index;
  }, [users]);

  // Search function using our optimized index
  const performSearch = useCallback((term: string) => {
    if (!term.trim()) {
      setFilteredUsers(users);
      return;
    }

    const normalizedTerm = term.toLowerCase().trim();
    const words = normalizedTerm.split(/\s+/);

    // For each word, find matching user IDs from our index
    const matchingSets = words.map(word => {
      return searchIndex.get(word) || new Set<number>();
    });

    // If multiple words, find intersection
    let matchingIds: Set<number>;
    if (matchingSets.length > 0) {
      matchingIds = matchingSets[0];
      for (let i = 1; i < matchingSets.length; i++) {
        matchingIds = new Set([...matchingIds].filter(id => matchingSets[i].has(id)));
      }
    } else {
      matchingIds = new Set();
    }

    // Filter users based on matching IDs
    const results = users.filter(user => matchingIds.has(user.id));

    setFilteredUsers(results);
  }, [users, searchIndex]);

  // Create debounced search function
  const debouncedSearch = useMemo(() => {
    return debounce((term: string) => {
      performSearch(term);
    }, 300);
  }, [performSearch]);

  // Handle search input change
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  }, [debouncedSearch]);

  return {
    users: filteredUsers,
    searchTerm,
    handleSearchChange,
    isLoading,
    error,
  };
};

export default useSearchUsers;
