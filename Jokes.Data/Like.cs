using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jokes.Data
{
    public class Like
    {
        public int JokeId { get; set; }
        public int UserId { get; set; }
        public bool Liked { get; set; }
    }
}
