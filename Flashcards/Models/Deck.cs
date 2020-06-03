using System;
using System.Collections.Generic;

namespace Flashcards.Models
{
    public class Deck
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public List<Card> Cards { get; set; }
    }
}