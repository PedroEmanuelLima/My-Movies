import React, { useEffect, useState } from 'react';
import {
    Alert, Container, Card, CardImg, CardText,
    CardBody, CardTitle
} from 'reactstrap';

import './styles.css';

import { api } from '../../config';
import ModalComponent from '../../components/ModalComponent';
import axios from 'axios';

const Home = () => {

    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const getImage = (url) => {
        axios.get(url).then(img => true).catch(() => false);
    }

    const getMovies = (e) => {
        setTitle(e.target.value);
        if (title.trim().length > 0) {
            api.get(`/3/search/movie?query=${title}`)
                .then(({ data }) => {
                    setData(data.results);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        mensagem: 'Erro: tente mais tarde!'
                })
            });
        }
    };

    return (
        <>
            <div>
                <div>
                    <input onChange={e => getMovies(e)} value={title}/>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.mensagem}</Alert> : ""}
                {data.length <= 0 && status.type === ""
                    ?
                    <div className="d-flex justify-content-center mt-5 pt-5">
                        <div className="spinner-border text-danger" role="status"></div>
                    </div>
                    :
                    <Container>
                        {data.map(movie => (
                            <Card key={movie.id} className="card">
                                <CardImg className="img-movie" src={ `https://image.tmdb.org/t/p/w300${movie.poster_path}` }
                                    alt={`Image movie ${movie.title}`} />
                                <CardBody className="card-body">
                                    <CardTitle tag="h5">{movie.title}</CardTitle>
                                    <CardText>Data de lançamento: {movie.release_date}</CardText>
                                    <div className="btn-container">
                                        <ModalComponent
                                            buttonLabel="More"
                                            className="btn btn-light btn-outline-danger"
                                            movieModal={{
                                                title: movie.title,
                                                overview: movie.overview,
                                                vote_average: movie.vote_average > 0 ? movie.vote_average : "Sem Dados Suficiente"
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        ))}

                    </Container>
                }
            </div>
        </>
    );
};

export default Home;