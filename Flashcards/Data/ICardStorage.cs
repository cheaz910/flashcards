using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Models;

namespace Flashcards.Data
{
    public interface ICardStorage
    {
        Task<Card> GetCardAsync(Guid cardId);
        Task<List<Card>> GetCardsAsync(Guid deckId);
        Task<Card> AddCardAsync(Guid deckId, Card card);
        Task UpdateCardAsync(Guid cardId, Card card);
        Task DeleteCardAsync(Guid cardId);
        Task DeleteAllCardsFromDeck(Guid deckId);
    }
    
    
}