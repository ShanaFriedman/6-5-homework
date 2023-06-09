using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jokes.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;
        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddUser(User u, string password)
        {
            var context = new JokesDbContext(_connectionString);
            u.HashPassword = BCrypt.Net.BCrypt.HashPassword(password);
            context.Users.Add(u);
            context.SaveChanges();
        }
        public User Login(string email, string password)
        {
            User user = GetByEmail(email);
            if (user == null)
            {
                return null;

            }

            bool isValid = BCrypt.Net.BCrypt.Verify(password, user.HashPassword);

            if (!isValid)
            {
                return null;
            }

            return user;
        }
        public User GetByEmail(string email)
        {
            var context = new JokesDbContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }
    }
}
