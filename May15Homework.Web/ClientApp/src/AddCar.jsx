import React from 'react';
import axios from 'axios';

class AddCar extends React.Component {
    state = {
        Person: {
            id: '',
            firstName: '',
            lastName: '',
        },
        Car: {
            make: '',
            model: '',
            year: '',
            personId: ''
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`/api/people/getPersonName?id=${id}`);
        const { data } = response
        this.setState({ Person: data });
    }

    onAddCarClick = async () => {
        await axios.post('/api/people/addcar', this.state.Car)
        this.props.history.push('/')
    }

    onTextBoxChange = e => {
        const { id } = this.props.match.params
        const copy = { ...this.state.Car, personId: id }
        copy[e.target.name] = e.target.value
        this.setState({ Car: copy })
    }
    render() {
        const { firstName, lastName } = this.state.Person
        const { make, model, year } = this.state.Car
        return (<>
            <div>
                <div className='col-md-6 offset-md-3 card bg-light p-4'>
                    <h2>Add Car for {`${firstName} ${lastName}`}</h2>
                    <div className='mt-2'>
                        <input type='text' value={make} placeholder='Make' name='make' className='form-control' onChange={this.onTextBoxChange} />
                    </div>
                    <div className='mt-2'>
                        <input type='text' value={model} placeholder='Model' name='model' className='form-control' onChange={this.onTextBoxChange} />
                    </div>
                    <div className='mt-2'>
                        <input type='text' value={year} placeholder='Year' name='year' className='form-control' onChange={this.onTextBoxChange} />
                    </div>
                    <div className='mt-2'>
                        <button className='btn btn-block btn-primary w-100' onClick={this.onAddCarClick}>Submit</button>
                    </div>

                </div>
            </div>
        </>);
    }
}

export default AddCar;
