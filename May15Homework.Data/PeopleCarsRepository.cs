using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace May15Homework.Data
{
    public class PeopleCarsRepository
    {
        private string _connectionString;
        public PeopleCarsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            var context = new PeopleCarsDbContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList(); 
        }
        public void AddPerson(Person p)
        {
            var context = new PeopleCarsDbContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }
        public void AddCar(Car c)
        {
            var context = new PeopleCarsDbContext(_connectionString);
            context.Cars.Add(c);
            context.SaveChanges();
        }
        public void DeleteCarsForPerson(int personId)
        {
            using var context = new PeopleCarsDbContext(_connectionString);
            var carsToDelete = context.Cars.Where(c => c.PersonId == personId);
            context.Cars.RemoveRange(carsToDelete);
            context.SaveChanges();
        }

        public Person GetPersonById(int id)
        {
            using var context = new PeopleCarsDbContext(_connectionString);
            return context.People.Include(p => p.Cars).Where(p => p.Id == id).FirstOrDefault();
        }
        public Person GetPersonName(int id)
        {
            using var context = new PeopleCarsDbContext(_connectionString);
            return context.People.Where(p => p.Id == id).FirstOrDefault();
        }
        public List<Car> GetCarsForPerson(int id)
        {
            using var context = new PeopleCarsDbContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }
        public List<Person> SearchPeople(string searchText)
        {
            var context = new PeopleCarsDbContext(_connectionString);
            return context.People.Include(p => p.Cars).Where(p => p.FirstName.ToLower().Contains(searchText.ToLower())
            || p.LastName.ToLower().Contains(searchText.ToLower())).ToList();
        }
    }
}
