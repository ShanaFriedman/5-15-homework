import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function PersonRow({ person }) {
    const { firstName, lastName, age, cars, id } = person

    return (<>
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{cars.length}</td>
            <td>
                <Link to={`/addcar/${id}`}>
                    <button className='btn btn-primary btn-block'>Add Car</button>
                </Link>
            </td>
            <td>
                <Link to={`/deletecars/${id}`}>
                    <button className='btn btn-danger btn-block'>Delete Cars</button>
                </Link>
            </td>
        </tr>
    </>)

}