using System;

namespace Flashcards.Models
{
    public class Card
    {
        public Guid Id { get; set; }
        public Guid DeckId { get; set; }
        public string Text { get; set; }
        public string Translation { get; set; }
        public string ImageUrl { get; set; }
    }
}