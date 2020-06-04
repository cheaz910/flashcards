using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flashcards.Data;
using Flashcards.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Flashcards.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DecksController : Controller
    {
        private readonly IDeckStorage _deckCollection;
        private readonly ICardStorage _cardCollection;

        public DecksController(IDeckStorage decks, ICardStorage cards)
        {
            _deckCollection = decks;
            _cardCollection = cards;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deck>>> GetDecks()
        {
            // var decks = await _deckCollection.GetDecksAsync();
            // if (decks == null)
            //     return NotFound();
            return Ok(await _deckCollection.GetAllDecksAsync());
        }
        
        [HttpGet("{deckId}")]
        public async Task<ActionResult<IEnumerable<Card>>> GetDeck(Guid userId, Guid deckId)
        {
            var cards = await _deckCollection.GetDeckAsync(deckId);

            if (cards == null)
                return NotFound();

            return Ok(cards);
        }

        [HttpDelete("{deckId}")]
        public async Task<ActionResult> DeleteDeck(Guid deckId)
        {
            await _deckCollection.DeleteDeckAsync(deckId);
            return Ok();
        }
        
        [HttpGet("{deckId}/cards")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCardsFromDeck(Guid deckId)
        {
            return await _cardCollection.GetCardsAsync(deckId);
        }
        
        [HttpPost]
        public async Task<ActionResult<Deck>> PostDeck([FromBody] Deck deck)
        {
            if (deck == null)
            {
                return BadRequest();
            }

            deck.Id = Guid.NewGuid();
            await _deckCollection.AddDeckAsync(deck);
            return Ok(deck);
        }

        [HttpPut("{deckId}")]
        public async Task<ActionResult<Deck>> UpdateDeck([FromRoute] Guid deckId, [FromBody] Deck deck)
        {
            if (deck == null)
            {
                return BadRequest();
            }

            deck.Id = deckId;
            var newDeck = await _deckCollection.UpdateDeckAsync(deckId, deck);
            return Ok(newDeck);
        }
        
        [HttpPost("{deckId}/cards")]
        public async Task<ActionResult<Card>> PostCard(Guid deckId, [FromBody] Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }

            var result = await _cardCollection.AddCardAsync(deckId, card);
            if (result == null)
                return StatusCode(500);
            return Ok(result);
        }
    }
}