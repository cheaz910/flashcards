using System;
using System.Threading.Tasks;
using Flashcards.Data;
using Flashcards.Models;
using Microsoft.AspNetCore.Mvc;

namespace Flashcards.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : Controller
    {
        private readonly ICardStorage _cardCollection;

        public CardsController(ICardStorage cards)
        {
            _cardCollection = cards;
        }
        
        [HttpGet("{cardId}")]
        public async Task<ActionResult<Card>> GetCard(Guid cardId)
        {
            var card = await _cardCollection.GetCardAsync(cardId);
            return new ObjectResult(card);
        }
        
        [HttpDelete("{cardId}")]
        public async Task<ActionResult> DeleteCard(Guid cardId)
        {
            await _cardCollection.DeleteCardAsync(cardId);
            return Ok();
        }
    }
}