using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Flashcards.Models;
using Microsoft.AspNetCore.Mvc;

namespace Flashcards.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        IDbContext db;
        public UsersController(IDbContext context)
        {
            db = context;
        }
 
        // GET api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await db.GetUsersAsync();
        }
 
        // GET api/users/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<User>> GetUser(Guid userId)
        {
            if (!db.ContainsUser(userId))
                return NotFound();
            var user = await db.GetUserAsync(userId);
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
 
            await db.AddUserAsync(user);
            return Ok(user);
        }
 
        // PUT api/users/5
        [HttpPut("{userId}")]
        public async Task<ActionResult<User>> PutUser(Guid userId, User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (!db.ContainsUser(userId))
                return NotFound();

            await db.UpdateUserAsync(userId, user);
            return Ok(user);
        }
 
        // DELETE api/users/5
        [HttpDelete("{userId}")]
        public async Task<ActionResult> DeleteUser(Guid userId)
        {
            if (!db.ContainsUser(userId))
                return NotFound();
            await db.DeleteUserAsync(userId);
            return Ok();
        }
        
        // GET api/users/5/decks
        [HttpGet("{userId}/decks")]
        public async Task<ActionResult<IEnumerable<Deck>>> GetDecks(Guid userId)
        {
            if (!db.ContainsUser(userId))
                return NotFound();
            return await db.GetDecksAsync(userId);
        }
        
        // GET api/users/5/decks/5
        [HttpGet("{userId}/decks/{deckId}")]
        public async Task<ActionResult<IEnumerable<Card>>> GetDeck(Guid userId, Guid deckId)
        {
            if (!db.ContainsDeck(userId, deckId))
                return NotFound();
            var cards = await db.GetDeckAsync(userId, deckId);
            return new ObjectResult(cards);
        }
        
        // POST api/users/5/decks
        [HttpPost("{userId}/decks")]
        public async Task<ActionResult<Deck>> PostDeck(Guid userId, Deck deck)
        {
            if (deck == null)
            {
                return BadRequest();
            }
            if (!db.ContainsUser(userId))
                return NotFound();
            
            await db.AddDeckAsync(userId, deck);
            return Ok(deck);
        }
        
        // PUT api/users/5/decks/5
        [HttpPut("{userId}/decks/{deckId}")]
        public async Task<ActionResult<Deck>> PutDeck(Guid userId, Guid deckId, Deck deck)
        {
            if (deck == null)
            {
                return BadRequest();
            }
            if (!db.ContainsDeck(userId, deckId))
                return NotFound();

            await db.UpdateDeckAsync(userId, deckId, deck);
            return Ok(deck);
        }
        
        // DELETE api/users/5/decks/5
        [HttpDelete("{userId}/decks/{deckId}")]
        public async Task<ActionResult> DeleteDeck(Guid userId, Guid deckId)
        {
            if (!db.ContainsDeck(userId, deckId))
                return NotFound();
            await db.DeleteDeckAsync(userId, deckId);
            return Ok();
        }
        
        // GET api/users/5/decks/5/cards
        [HttpGet("{userId}/decks/{deckId}/cards")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards(Guid userId, Guid deckId)
        {
            if (!db.ContainsDeck(userId, deckId))
                return NotFound();
            return await db.GetCardsAsync(userId, deckId);
        }
        
        // GET api/users/5/decks/5/cards/5
        [HttpGet("{userId}/decks/{deckId}/cards/{cardId}")]
        public async Task<ActionResult<Card>> GetCard(Guid userId, Guid deckId, Guid cardId)
        {
            if (!db.ContainsCard(userId, deckId, cardId))
                return NotFound();
            var card = await db.GetCardAsync(userId, deckId, cardId);
            return new ObjectResult(card);
        }
        
        // POST api/users/5/decks/5/cards
        [HttpPost("{userId}/decks/{deckId}/cards")]
        public async Task<ActionResult<Card>> PostCard(Guid userId, Guid deckId, Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }
            if (!db.ContainsDeck(userId, deckId))
                return NotFound();
            
            await db.AddCardAsync(userId, deckId, card);
            return Ok(card);
        }
        
        // PUT api/users/5/decks/5/cards/5
        [HttpPut("{userId}/decks/{deckId}/cards/{cardId}")]
        public async Task<ActionResult<Card>> PutCard(Guid userId, Guid deckId, Guid cardId, Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }
            if (!db.ContainsCard(userId, deckId, cardId))
                return NotFound();

            await db.UpdateCardAsync(userId, deckId, cardId, card);
            return Ok(card);
        }
        
        // DELETE api/users/5/decks/5/cards/5
        [HttpDelete("{userId}/decks/{deckId}/cards/{cardId}")]
        public async Task<ActionResult> DeleteCard(Guid userId, Guid deckId, Guid cardId)
        {
            if (!db.ContainsCard(userId, deckId, cardId))
                return NotFound();
            await db.DeleteCardAsync(userId, deckId, cardId);
            return Ok();
        }
    }
}