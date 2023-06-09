using Jokes.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System;

namespace Jokes.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokesController : ControllerBase
    {
        private readonly string _connectionString;
        public JokesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getalljokes")]
        public List<Joke> GetAllJoke()
        {
            var repo = new JokesRepository(_connectionString);
            return repo.GetAllJokes();
        }
        [HttpGet]
        [Route("getjoke")]
        public Joke GetJoke()
        {
            var client = new HttpClient();
            var json = client.GetStringAsync("https://jokesapi.lit-projects.com/jokes/programming/random").Result;
            var joke = JsonSerializer.Deserialize<List<Joke>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }).First();
            var repo = new JokesRepository(_connectionString);
            Joke j = repo.AddJoke(joke);

            return j;
        }
        [HttpPost]
        [Route("addlikeordislike")]
        public Joke AddLikeOrDislike(Like l)
        {
            var userRepo = new UserRepository(_connectionString);
            l.UserId = userRepo.GetByEmail(User.Identity.Name).Id;
            //l.Liked = true;
            var jokesRepo = new JokesRepository(_connectionString);
            jokesRepo.AddLike(l);
            return jokesRepo.GetJokeById(l.JokeId);

        }

    }
}
