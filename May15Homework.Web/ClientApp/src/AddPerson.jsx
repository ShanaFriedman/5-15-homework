import React from 'react';
import axios from 'axios';

class AddPerson extends React.Component {
    state = { 
        Person: {
            firstName: '',
            lastName: '',
            age: ''
        }
     } 

     onAddPersonClick = async() => {
        await axios.post('/api/people/AddPerson', this.state.Person)
        this.setState({Person: {
            firsName: '',
            lastName: '',
            age: ''
        }})
        this.props.history.push('/')
     }

     onTextChange = e => {
        const copy = {...this.state.Person}
        copy[e.target.name] = e.target.value
        this.setState({Person: copy})
     }



    render() {
        const {firsName, lastName, age} = this.state.Person 
        return (<>
            <div>
                <div className='col-md-6 offset-md-3 card bg-light p-4'>
                    <h2>Add Person </h2>
                    <div className='mt-2'>
                        <input type='text' placeholder='First Name' value={firsName} name='firstName' className='form-control' onChange={this.onTextChange}/>
                    </div>
                    <div className='mt-2'>
                        <input type='text' placeholder='Last Name' value={lastName} name='lastName'  className='form-control' onChange={this.onTextChange} />
                    </div>
                    <div className='mt-2'>
                        <input type='text' placeholder='Age' name='age' value={age} className='form-control' onChange={this.onTextChange} />
                    </div>
                    <div className='mt-2'>
                        <button className='btn btn-block btn-primary w-100' onClick={this.onAddPersonClick}>Submit</button>
                    </div>
    
                </div>
            </div>
        </>);
    }
}
 
export default AddPerson;
