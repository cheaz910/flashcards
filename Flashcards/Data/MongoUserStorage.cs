using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Models;

namespace Flashcards.Data
{
    public class MongoUserStorage : IUserStorage
    {
        
        
        
        public Task<List<User>> GetUsersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task AddUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task UpdateUserAsync(Guid userId, User user)
        {
            throw new NotImplementedException();
        }

        public Task DeleteUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateUserAsync()
        {
            throw new NotImplementedException();
        }
    }
}