using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Data;
using Flashcards.Models;
using MongoDB.Driver;

namespace Flashcards.Data
{
    public class MongoDeckStorage : IDeckStorage
    {

        private readonly IMongoCollection<Deck> _deckCollection;
        
        public MongoDeckStorage(IMongoDatabase database)
        {
            _deckCollection = database.GetCollection<Deck>("decks");
            _deckCollection.Indexes.CreateOne(
                new CreateIndexModel<Deck>(Builders<Deck>.IndexKeys.Hashed(deck => deck.UserId)));
        }
        
        public Task<List<Deck>> GetDecksAsync(Guid userId)
        {
            return _deckCollection.Find(deck => deck.UserId == userId).ToListAsync();
        }

        public Task<Deck> GetDeckAsync(Guid userId, Guid deckId)
        {
            return _deckCollection.Find(deck => deck.Id == deckId).FirstOrDefaultAsync();
        }

        public async Task<Deck> AddDeckAsync(Guid userId, Deck deck)
        {
            await _deckCollection.InsertOneAsync(deck);
            return deck;
        }

        public Task UpdateDeckAsync(Guid userId, Guid deckId, Deck deck)
        {
            throw new NotImplementedException();
        }

        public Task DeleteDeckAsync(Guid userId, Guid deckId)
        {
            throw new NotImplementedException();
        }
    }
}