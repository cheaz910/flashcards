using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Flashcards.Models;
using Microsoft.AspNetCore.Mvc;
using Flashcards.Data;
using MongoDB.Driver;

namespace Flashcards.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ICardStorage _cardCollection;
        private readonly IDeckStorage _deckCollection;
        private readonly IUserStorage _userCollection;
        
        public UsersController(ICardStorage cards, IDeckStorage decks, IUserStorage users)
        {
            _cardCollection = cards;
            _userCollection = users;
            _deckCollection = decks;
        }
 
        // GET api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userCollection.GetUsersAsync();
        }
 
        // GET api/users/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<User>> GetUser(Guid userId)
        {
            var user = await _userCollection.GetUserAsync(userId);
            return new ObjectResult(user);
        }
 
        // POST api/users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
 
            await _userCollection.AddUserAsync(user);
            return Ok(user);
        }
 
        // PUT api/users/5
        [HttpPut("{userId}")]
        public async Task<ActionResult<User>> PutUser(Guid userId, [FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            await _userCollection.UpdateUserAsync(userId, user);
            return Ok(user);
        }
 
        // DELETE api/users/5
        [HttpDelete("{userId}")]
        public async Task<ActionResult> DeleteUser(Guid userId)
        {
            await _userCollection.DeleteUserAsync(userId);
            return Ok();
        }
        
        // GET api/users/5/decks
        [HttpGet("{userId}/decks")]
        public async Task<ActionResult<IEnumerable<Deck>>> GetDecks(Guid userId)
        {
            return await _deckCollection.GetDecksAsync(userId);
        }
        
        // GET api/users/5/decks/5
        [HttpGet("{userId}/decks/{deckId}")]
        public async Task<ActionResult<IEnumerable<Card>>> GetDeck(Guid userId, Guid deckId)
        {
            var cards = await _deckCollection.GetDeckAsync(userId, deckId);
            return new ObjectResult(cards);
        }
        
        // POST api/users/5/decks
        [HttpPost("{userId}/decks")]
        public async Task<ActionResult<Deck>> PostDeck(Guid userId, [FromBody] Deck deck)
        {
            if (deck == null)
            {
                return BadRequest();
            }

            deck.Id = Guid.NewGuid();
            deck.UserId = userId;
            await _deckCollection.AddDeckAsync(userId, deck);
            return Ok(deck);
        }
        
        // PUT api/users/5/decks/5
        [HttpPut("{userId}/decks/{deckId}")]
        public async Task<ActionResult<Deck>> PutDeck(Guid userId, Guid deckId, [FromBody] Deck deck)
        {
            if (deck == null)
            {
                return BadRequest();
            }

            await _deckCollection.UpdateDeckAsync(userId, deckId, deck);
            return Ok(deck);
        }
        
        // DELETE api/users/5/decks/5
        [HttpDelete("{userId}/decks/{deckId}")]
        public async Task<ActionResult> DeleteDeck(Guid userId, Guid deckId)
        {
            await _deckCollection.DeleteDeckAsync(userId, deckId);
            return Ok();
        }
        
        // GET api/users/5/decks/5/cards
        [HttpGet("{userId}/decks/{deckId}/cards")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards(Guid userId, Guid deckId)
        {
            return await _cardCollection.GetCardsAsync(userId, deckId);
        }
        
        // GET api/users/5/decks/5/cards/5
        [HttpGet("{userId}/decks/{deckId}/cards/{cardId}")]
        public async Task<ActionResult<Card>> GetCard(Guid userId, Guid cardId)
        {
            var card = await _cardCollection.GetCardAsync(userId, cardId);
            return new ObjectResult(card);
        }
        
        // POST api/users/5/decks/5/cards
        [HttpPost("{userId}/decks/{deckId}/cards")]
        public async Task<ActionResult<Card>> PostCard(Guid userId, Guid deckId, [FromBody] Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }

            await _cardCollection.AddCardAsync(userId, deckId, card);
            return Ok(card);
        }
        
        // PUT api/users/5/decks/5/cards/5
        [HttpPut("{userId}/decks/{deckId}/cards/{cardId}")]
        public async Task<ActionResult<Card>> PutCard(Guid userId, Guid deckId, Guid cardId, [FromBody] Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }

            await _cardCollection.UpdateCardAsync(userId, cardId, card);
            return Ok(card);
        }
        
        // DELETE api/users/5/decks/5/cards/5
        [HttpDelete("{userId}/decks/{deckId}/cards/{cardId}")]
        public async Task<ActionResult> DeleteCard(Guid userId, Guid deckId, Guid cardId)
        {
            await _cardCollection.DeleteCardAsync(userId, cardId);
            return Ok();
        }
    }
}