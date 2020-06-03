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
        
        public Task<Card> GetCardAsync(Guid cardId)
        {
            return _cardCollection.Find(card => cardId == card.Id).FirstOrDefaultAsync();
        }

        public Task<List<Card>> GetCardsAsync(Guid deckId)
        {
            return _cardCollection.Find(card => card.DeckId == deckId).ToListAsync();
        }

        public async Task<Card> AddCardAsync(Guid deckId, Card card)
        {
            card.DeckId = deckId;
            await _cardCollection.InsertOneAsync(card);
            return card;
        }

        public Task UpdateCardAsync(Guid cardId, Card card)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCardAsync(Guid cardId)
        {
            return _cardCollection.DeleteOneAsync(card => cardId == card.Id);
        }
    }
}