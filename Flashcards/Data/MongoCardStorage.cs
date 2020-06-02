using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Models;
using MongoDB.Driver;

namespace Flashcards.Data
{
    public class MongoCardStorage : ICardStorage
    {
        private readonly IMongoCollection<Card> _cardCollection;
        
        
        public MongoCardStorage(IMongoDatabase database)
        {
            _cardCollection = database.GetCollection<Card>("allCards");
            _cardCollection.Indexes.CreateOne(
                new CreateIndexModel<Card>(Builders<Card>.IndexKeys.Hashed(c => c.DeckId)));
        }
        
        public Task<Card> GetCardAsync(Guid userId, Guid cardId)
        {
            return _cardCollection.Find(card => cardId == card.Id).FirstOrDefaultAsync();
        }

        public Task<List<Card>> GetCardsAsync(Guid userId, Guid deckId)
        {
            return _cardCollection.Find(card => card.DeckId == deckId).ToListAsync();
        }

        public Task AddCardAsync(Guid userId, Guid deckId, Card card)
        {
            throw new NotImplementedException();
        }

        public Task UpdateCardAsync(Guid userId, Guid cardId, Card card)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCardAsync(Guid userId, Guid cardId)
        {
            throw new NotImplementedException();
        }
    }
}