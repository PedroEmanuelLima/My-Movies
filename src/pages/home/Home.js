import React, { useEffect, useState } from 'react';
import { Alert, Container, Card } from 'react-bootstrap';

import './styles.css';

import { api } from '../../config';
import ModalComponent from '../../components/ModalComponent';

const Home = () => {

    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const [dataLoad, setDataLoad] = useState(false);
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    useEffect(()=>{
        getMovies();
    }, [title]);

    useEffect(() => {
        setStatus({ type: '', mensagem: ''});
        setTimeout(() => {
            if (dataLoad & data.length === 0) {
                setStatus({ type: 'error', mensagem: 'Erro: Filme Não Encontrado!'});
            } else {
                setStatus({ type: '', mensagem: ''});
            }
        }, 2000);
    }, [data, title])

    const getMovies = () => {
        if (title.trim().length <= 0) {
            api.get(`/3/movie/popular?language=en-US&page=1`)
                .then(({ data }) => {
                    setData(data.results);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        mensagem: 'Erro: tente mais tarde!'
                })
            });
        } else {
            api.get(`/3/search/movie?query=${title}`)
                .then(({ data }) => {
                    setData(data.results);
                })
                .then(setDataLoad(true))
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
                <Container>
                    <input onChange={e => setTitle(e.target.value)} value={title} className="input-search"/>
                </Container>
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
                                <Card.Img className="img-movie" src={ `https://image.tmdb.org/t/p/w200/${movie.poster_path}` }
                                    alt={`Image movie ${movie.title}`} />
                                <Card.Body className="card-body">
                                    <Card.Title tag="h5" className="titleMovieList">{movie.title}</Card.Title>
                                    <Card.Text>Data de lançamento: {movie.release_date}</Card.Text>
                                    <div className="btn-container">
                                        <ModalComponent
                                            buttonLabel="More"
                                            movieModal={{
                                                title: movie.title,
                                                overview: movie.overview,
                                                vote_average: movie.vote_average > 0 ? movie.vote_average : "Sem Dados Suficiente"
                                            }}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}

                    </Container>
                }
            </div>
        </>
    );
};

export default Home;