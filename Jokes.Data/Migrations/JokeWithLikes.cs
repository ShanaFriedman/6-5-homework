using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jokes.Data.Migrations
{
    public class JokeWithLikes
    {
        public Joke Joke { get; set; }
        public List<int> LikedIds { get; set; }
        public List<int> DislikedIds { get; set; }
    }
}
