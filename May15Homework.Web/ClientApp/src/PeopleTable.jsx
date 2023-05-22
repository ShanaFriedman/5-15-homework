import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PersonRow from './PersonRow';
import axios from 'axios';

class PeopleTable extends React.Component {
    state = {
        People: [],
        Person: {
            firstName: '',
            lastName: '',
            age: '',
            cars: []
        },
        SearchText: '',
        PeopleToShow: []
    }

    resetTable = async () => {
        const response = await axios.get('/api/people/GetAll');
        const people = response.data;
        this.setState({ PeopleToShow: people, People: people });
    }

    componentDidMount = async () => {
        await this.resetTable()
    }

    // onSeachTextChange = async e => {
    //     const search = e.target.value
    //     console.log(search)
    //     this.setState({ SearchText: e.target.value })
    //     const respons = await axios.get('/api/people/SearchPeople', search)

    //     this.setState({ People: respons.data })
    // }

    onSeachTextChange = e => {
        const search = e.target.value
        const filtered = this.state.People.filter(p =>
            p.firstName.toLowerCase().includes(search.toLowerCase()) ||
            p.lastName.toLowerCase().includes(search.toLowerCase())
        )
        this.setState({ PeopleToShow: filtered, SearchText: search })
    }

    onClearClick = () => {
        this.setState({ SearchText: '', PeopleToShow: this.state.People })
    }

    render() {
        return (<>

            <div className='row'>
                <div className='col-md-10'>
                    <input type='text' className='form-control form-control-lg' value={this.state.SearchText} placeholder='Search Person' onChange={this.onSeachTextChange} />
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-dark btn-lg w-100' onClick={this.onClearClick}>Clear</button>
                </div>
            </div>
            <div className='row mt-3 col-md-12'>
                <Link to='/addperson'>
                    <button className='btn btn-success btn-lg w-100'>Add Person</button>
                </Link>

            </div>

            <table className='table table-bordered table-hover table-striped mt-3'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Car Count</th>
                        <th>Add Car</th>
                        <th>Delete Cars</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.PeopleToShow.map(p => <PersonRow
                        person={p}
                        key={p.id}
                    />)}

                </tbody>
            </table>
        </>
        );
    }
}

export default PeopleTable;