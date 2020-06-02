using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Models;

namespace Flashcards.Data
{
    public interface IUserStorage
    {
        Task<List<User>> GetUsersAsync();
        Task<User> GetUserAsync(Guid userId);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(Guid userId, User user);
        Task DeleteUserAsync(Guid userId);
    }
}