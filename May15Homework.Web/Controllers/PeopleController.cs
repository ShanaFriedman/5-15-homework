using May15Homework.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace May15Homework.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("AddPerson")]
        public void AddPerson(Person p)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.AddPerson(p);
        }
        [Route("GetAll")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetPeople();
        }
        [Route("getPersonById")]
        public Person GetPersonById(int personId)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetPersonById(personId);
        }
        [Route("AddCar")]
        public void AddCar(Car c)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.AddCar(c);
        }
        [Route("GetPersonName")]
        public Person GetPersonName(int id)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetPersonName(id);
        }
        [Route("GetCarsForPerson")]
        public List<Car> GetCars(int id)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.GetCarsForPerson(id);
        }

        [Route("DeleteCars")]
        public void DeleteCars(int personId)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            repo.DeleteCarsForPerson(personId);
        }
        [Route("SearchPeople")]
        public List<Person> SearchPeople(string search)
        {
            var repo = new PeopleCarsRepository(_connectionString);
            return repo.SearchPeople(search);
        }
    }
}
