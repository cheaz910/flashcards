using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Data;
using Flashcards.Models;
using Flashcards.Pages;
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
        
        
        public async Task<List<Deck>> GetAllDecksAsync()
        {
            return await _deckCollection.Find(_ => true).ToListAsync();
        }
        
        public Task<List<Deck>> GetDecksAsync(Guid userId)
        {
            return _deckCollection.Find(deck => deck.UserId == userId).ToListAsync();
        }

        public Task<Deck> GetDeckAsync(Guid deckId)
        {
            return _deckCollection.Find(deck => deck.Id == deckId).FirstOrDefaultAsync();
        }

        public async Task<Deck> AddDeckAsync(Deck deck)
        {
            await _deckCollection.InsertOneAsync(deck);
            return deck;
        }

        public async Task<Deck> UpdateDeckAsync(Guid deckId, Deck deck)
        {
            await _deckCollection.ReplaceOneAsync(d => d.Id == deckId, deck);
            return deck;
        }

        public async Task DeleteDeckAsync(Guid deckId)
        {
            await _deckCollection.DeleteOneAsync(deck => deck.Id == deckId);
        }
    }
}