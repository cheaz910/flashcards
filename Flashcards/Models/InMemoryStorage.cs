using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Flashcards.Controllers;

namespace Flashcards.Models
{
    public class InMemoryStorage : IDbContext
    {
        private static List<User> Users = new List<User>()
        {
            new User() {Id = Guid.Parse("81a130d2-502f-4cf1-a376-63edeb000e9f"), Name = "Alex"},
            new User() {Id = Guid.Parse("0f8fad5b-d9cb-469f-a165-70867728950e"), Name = "John"}
        };

        private static List<Deck> Decks = new List<Deck>()
        {
            new Deck() {Id = Guid.NewGuid(), Description = "Nature stuff", Title = "Nature", UserId = Guid.Empty},
            new Deck() {Id = Guid.NewGuid(), Description = "Modern city words", Title = "Modern", UserId = Guid.Empty},
            new Deck() {Id = Guid.NewGuid(), Description = "School words", Title = "School", UserId = Users[0].Id},
            new Deck()
            {
                Id = Guid.NewGuid(), Description = "Food names and related objects", Title = "Food",
                UserId = Users[1].Id
            }
        };

        private static List<Card> Cards = new List<Card>()
        {
            new Card() {Id = Guid.NewGuid(), DeckId = Decks[0].Id, Text = "Lion", Translation = "Лев"},
            new Card() {Id = Guid.NewGuid(), DeckId = Decks[1].Id, Text = "Skyscraper", Translation = "Небоскрёб"},
            new Card() {Id = Guid.NewGuid(), DeckId = Decks[2].Id, Text = "Ruler", Translation = "Линейка"},
            new Card() {Id = Guid.NewGuid(), DeckId = Decks[0].Id, Text = "Cake", Translation = "Торт"}
        };

        public bool ContainsUser(Guid userId)
        {
            return Users.Exists(usr => usr.Id == userId);
        }

        public bool ContainsDeck(Guid userId, Guid deckId)
        {
            return Decks.Exists(deck => deck.Id == deckId && (deck.UserId == userId || deck.UserId == Guid.Empty));
        }

        public bool ContainsCard(Guid userId, Guid deckId, Guid cardId)
        {
            throw new NotImplementedException();
        }

        public Task<List<User>> GetUsersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Deck>> GetDecksAsync(Guid userId)
        {
            return Decks.Where(deck => deck.UserId == userId || deck.UserId == Guid.Empty).ToList();
        }

        public async Task<List<Card>> GetDeckAsync(Guid userId, Guid deckId)
        {
            return Cards.Where(card => card.DeckId == deckId).ToList();
        }

        public Task<List<Card>> GetCardsAsync(Guid userId, Guid deckId)
        {
            throw new NotImplementedException();
        }

        public Task<Card> GetCardAsync(Guid userId, Guid deckId, Guid cardId)
        {
            throw new NotImplementedException();
        }

        public Task AddUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task AddDeckAsync(Guid userId, Deck deck)
        {
            throw new NotImplementedException();
        }

        public Task AddCardAsync(Guid userId, Guid deckId, Card card)
        {
            throw new NotImplementedException();
        }

        public Task UpdateUserAsync(Guid userId, User user)
        {
            throw new NotImplementedException();
        }

        public Task UpdateDeckAsync(Guid userId, Guid deckId, Deck deck)
        {
            throw new NotImplementedException();
        }

        public Task UpdateCardAsync(Guid userId, Guid deckId, Guid cardId, Card card)
        {
            throw new NotImplementedException();
        }

        public Task DeleteUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteDeckAsync(Guid userId, Guid deckId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCardAsync(Guid userId, Guid deckId, Guid cardId)
        {
            throw new NotImplementedException();
        }
    }
}