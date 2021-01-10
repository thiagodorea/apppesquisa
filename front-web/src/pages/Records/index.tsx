import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Filters from '../../components/Filters';
import './style.css';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import Loading from '../../Loading/Loading';

const BASE_URL = 'https://dspesquisa-thiago.herokuapp.com';
const Records = () => {

    const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();
    const [activePage, setActivePage] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
            .then(resp => {setRecordsResponse(resp.data); setDone(true);})
            .catch(error => { alert("Error ao carregar os dados do servidor, favor atualize a pagina." + error) })
    }, [activePage]);

    const handlePageChange = (index: number) => {
        setActivePage(index);
    }

    return (
        <div className="page-container">
            <Filters link="/charts" linkText="VER GRAFICOS" />
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDATE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {!done ? (<Loading />) : (
                        <>
                            {recordsResponse?.content.map(record => (
                                <tr key={record.id}>
                                    <td>{formatDate(record.moment)}</td>
                                    <td>{record.name}</td>
                                    <td>{record.age}</td>
                                    <td className="text-secondary">{record.gamePlatform}</td>
                                    <td>{record.genreName}</td>
                                    <td className="text-primary">{record.gameTitle}</td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
            <Pagination
                activePage={activePage}
                goToPage={handlePageChange}
                totalPages={recordsResponse?.totalPages}
            />
        </div>
    );
}

export default Records;