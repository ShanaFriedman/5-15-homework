import React from 'react';
import Layout from './Layout';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import PeopleTable from './PeopleTable'
import AddPerson from './AddPerson';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';

class App extends React.Component {

    render() {
        return (
            <Layout>
                <Route exact path='/' component={PeopleTable} />
                <Route exact path='/addPerson' component={AddPerson} />
                <Route exact path='/addCar/:id' component={AddCar} />
                <Route exact path='/deleteCars/:id' component={DeleteCars} />
            </Layout>
        );
    }
};

export default App;