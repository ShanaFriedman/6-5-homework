using Jokes.Data.Migrations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Jokes.Data
{
    public class JokesRepository
    {
        public readonly string _connectionString;
        public JokesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public Joke AddJoke(Joke j)
        {
            var context = new JokesDbContext(_connectionString);

            if (!CheckIfJokeIncluded(j.JokeId))
            {
                context.Jokes.Add(j);
                context.SaveChanges();
            }
            return context.Jokes.Include(joke => joke.Likes).FirstOrDefault(joke => j.JokeId == joke.JokeId);

        }
        public List<Joke> GetAllJokes()
        {
            var context = new JokesDbContext(_connectionString);
            return context.Jokes.Include(j => j.Likes).ToList();
        }
        public void AddLike(Like l)
        {
            var context = new JokesDbContext(_connectionString);

            if (CheckIfLiked(l))
            {
                context.Likes.Remove(l);
                context.SaveChanges();
            }
            context.Likes.Add(l);
            context.SaveChanges();
        }
        public bool CheckIfJokeIncluded(int jokeId)
        {
            var context = new JokesDbContext(_connectionString);
            return context.Jokes.Any(j => j.JokeId == jokeId);
        }
        public bool CheckIfLiked(Like like)
        {
            var context = new JokesDbContext(_connectionString);
            return context.Likes.Any(l => l.UserId == like.UserId && l.JokeId == like.JokeId);
        }
        public Joke GetJokeById(int id)
        {
            var context = new JokesDbContext(_connectionString);
            return context.Jokes.Include(j => j.Likes).FirstOrDefault(j => j.Id == id);
        }
    }
}
