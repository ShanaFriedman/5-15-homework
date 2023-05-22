import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

class DeleteCars extends React.Component {
    state = {
        Cars: [],
        SearchText: '',
        CarsToShow: []
    }

    onSeachTextChange = e => {
        const search = e.target.value
        const filtered = this.state.Cars.filter(c =>
            c.make.toLowerCase().includes(search.toLowerCase()) ||
            c.model.toLowerCase().includes(search.toLowerCase())
        )
        this.setState({ CarsToShow: filtered, SearchText: search })
    }

    onClearClick = () => {
        this.setState({ SearchText: '', CarsToShow: this.state.Cars })
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`/api/people/GetCarsForPerson?id=${id}`);
        const { data } = response
        this.setState({ Cars: data, CarsToShow: data});
    }

    onDeleteCarsClick = async () => {
        const { id } = this.props.match.params
        await axios.post(`/api/people/deletecars?personId=${id}`)
        this.props.history.push('/')
    }
    render() {
        const { Cars } = this.state
        return (<>
            {!!this.state.Cars.length && <>
                <div className="row">
                    <div className="col-md-10">
                        <input type="text" value={this.state.SearchText} className="form-control form-control-lg" placeholder="Search Cars" onChange={this.onSeachTextChange} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-dark btn-lg w-100" onClick={this.onClearClick}>
                            Clear
                        </button>
                    </div>
                </div>
                <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.CarsToShow.map(c => <tr>
                            <td>{c.make}</td>
                            <td>{c.model}</td>
                            <td>{c.year}</td>
                        </tr>)}
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-md-12 mt-3">
                        <h3>Are you sure you want to delete all of these cars?</h3>
                    </div>
                    <div className="col-md-6 mt-3">
                        <Link to="/">
                            <button className="btn btn-primary btn-lg w-100">No</button>
                        </Link>
                    </div>
                    <div className="col-md-6 mt-3">
                        <button className="btn btn-danger btn-lg w-100" onClick={this.onDeleteCarsClick}>Yes</button>
                    </div>
                </div>
            </>}
            {!this.state.Cars.length && <h1>no cars:(</h1>}

        </>
        );
    }
}

export default DeleteCars;

