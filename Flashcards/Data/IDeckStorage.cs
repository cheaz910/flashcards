using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Models;

namespace Flashcards.Data
{
    public interface IDeckStorage
    {
        Task<List<Deck>> GetDecksAsync(Guid userId);
        Task<Deck> GetDeckAsync(Guid userId, Guid deckId);
        Task<Deck> AddDeckAsync(Guid userId, Deck deck);
        Task UpdateDeckAsync(Guid userId, Guid deckId, Deck deck);
        Task DeleteDeckAsync(Guid userId, Guid deckId);
    }
}