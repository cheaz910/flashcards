using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Models;

namespace Flashcards.Data
{
    public interface IDeckStorage
    {
        Task<List<Deck>> GetDecksAsync(Guid userId);
        Task<Deck> GetDeckAsync(Guid deckId);
        Task<Deck> AddDeckAsync(Deck deck);
        Task<Deck> UpdateDeckAsync(Guid deckId, Deck deck);
        Task DeleteDeckAsync(Guid deckId);
    }
}