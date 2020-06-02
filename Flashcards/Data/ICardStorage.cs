using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Models;

namespace Flashcards.Data
{
    public interface ICardStorage
    {
        Task<Card> GetCardAsync(Guid userId, Guid cardId);
        Task<List<Card>> GetCardsAsync(Guid userId, Guid deckId);
        Task<Card> AddCardAsync(Guid userId, Guid deckId, Card card);
        Task UpdateCardAsync(Guid userId, Guid cardId, Card card);
        Task DeleteCardAsync(Guid userId, Guid cardId);
    }
    
    
}