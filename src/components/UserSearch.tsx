import  { useState,  } from 'react';
import { Search, User as UserIcon, Mail, Globe, Phone } from 'lucide-react';
import useSearchUsers from '../hooks/useSearchUsers';

const UserSearch = () => {
  const { users, searchTerm, handleSearchChange, isLoading, error } = useSearchUsers();
  const [imageLoadStatus, setImageLoadStatus] = useState<Record<number, boolean>>({});

  const handleImageLoad = (userId: number) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [userId]: true
    }));
  };

  // Generate random avatar URLs for demonstration
  const getAvatarUrl = (userId: number) => {
    return `https://i.pravatar.cc/100?img=${userId}`;
  };

  return (
    <section id="users" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Users</h2>
          <p className="mt-4 text-foreground/70">
            Search through our user database to find talented individuals.
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-foreground/50" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 w-full px-4 py-3 rounded-lg glass-morphism focus:ring-2 focus:ring-foreground/20 focus:ring-offset-0 transition-shadow"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto text-center p-6 glass-morphism rounded-2xl">
            <p className="text-destructive">Error: {error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="glass-card p-6 animate-pulse-soft">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary"></div>
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-secondary rounded"></div>
                    <div className="h-3 w-1/2 bg-secondary rounded mt-2"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-3 w-full bg-secondary rounded"></div>
                  <div className="h-3 w-full bg-secondary rounded"></div>
                  <div className="h-3 w-3/4 bg-secondary rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {users.length === 0 ? (
              <div className="max-w-4xl mx-auto text-center p-8 glass-morphism rounded-2xl">
                <p className="text-foreground/70">
                  No users found matching your search. Try a different term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {users.map((user) => (
                  <div key={user.id} className="glass-card p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary/50">
                        <img
                          src={getAvatarUrl(user.id)}
                          alt={user.name}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${
                            imageLoadStatus[user.id] ? 'opacity-100' : 'opacity-0'
                          }`}
                          onLoad={() => handleImageLoad(user.id)}
                          loading="lazy"
                        />
                        {!imageLoadStatus[user.id] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-foreground/70">@{user.username}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-foreground/70 mr-2" />
                        <span className="text-foreground/80 truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-foreground/70 mr-2" />
                        <span className="text-foreground/80 truncate">{user.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-foreground/70 mr-2" />
                        <span className="text-foreground/80 truncate">{user.website}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium">Company</p>
                      <p className="text-sm text-foreground/70">{user.company.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default UserSearch;
