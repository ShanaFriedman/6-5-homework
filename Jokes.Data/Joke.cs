using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Jokes.Data
{
    public class Joke
    {
        public int Id { get; set; }
        public int JokeId { get; set; }
        public string Setup { get; set; }
        public string Punchline { get; set; }
        public List<Like> Likes { get; set; }
    }
}
