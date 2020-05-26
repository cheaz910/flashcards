using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Flashcards.Models
{
    public interface IDbContext
    {
        bool ContainsUser(Guid userId);
        bool ContainsDeck(Guid userId, Guid deckId);
        bool ContainsCard(Guid userId, Guid deckId, Guid cardId);
        
        Task<List<User>> GetUsersAsync();
        Task<User> GetUserAsync(Guid userId);
        Task<List<Deck>> GetDecksAsync(Guid userId);
        Task<Deck> GetDeckAsync(Guid userId, Guid deckId);
        Task<List<Card>> GetCardsAsync(Guid userId, Guid deckId);
        Task<Card> GetCardAsync(Guid userId, Guid deckId, Guid cardId);
        Task AddUserAsync(User user);
        Task AddDeckAsync(Guid userId, Deck deck);
        Task AddCardAsync(Guid userId, Guid deckId, Card card);
        Task UpdateUserAsync(Guid userId, User user);
        Task UpdateDeckAsync(Guid userId, Guid deckId, Deck deck);
        Task UpdateCardAsync(Guid userId, Guid deckId, Guid cardId, Card card);
        Task DeleteUserAsync(Guid userId);
        Task DeleteDeckAsync(Guid userId, Guid deckId);
        Task DeleteCardAsync(Guid userId, Guid deckId, Guid cardId);
    }
}