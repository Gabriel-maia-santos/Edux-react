import React, { useEffect, useState } from 'react';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import Titulo from '../../../components/titulo';

import './index.css'
import { Form, Button, Container, Card, Row, FormLabel, Col, Table } from 'react-bootstrap';
import { url } from '../../../utils/constants';

const AlunoTurma = () => {

    const [id, setId] = useState(0);
    const [matricula,  setMatricula] = useState('');
    const [idTurma, setIdTurma] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [alunosTurma, setAlunosturma] = useState([])

    useEffect(() => {
        listar();
    }, [])

    const Cadastrar = (event) => {
        event.preventDefault();

        const alunosTurma = {
           matricula: matricula,
           idTurma : "a6b9acc6-3713-4579-bc1d-30470996b6a7",
           idUsuario : "8ab44423-b7ef-43c0-a456-294c0047ce3a"
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/alunoturma` :  `${url}/alunoturma/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(alunosTurma),
            headers : {
                'content-type' : 'application/json',
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Matricula salva');

            listar();
        })
        .catch(err => console.error(err))
    }


    const listar = () => {

        fetch(`${url}/alunoTurma`)
            .then(response => response.json())
            .then(dados => {
                setAlunosturma(dados.data);
                
                limparCampos();
            })
            .catch(err => console.error(err));
    }


    const editar = (event) => {
        event.preventDefault();

        fetch(url + '/alunoTurma/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setId(dado.id);
            setMatricula(dado.matricula);
        })
    }




    const remover = (event) => {
        event.preventDefault();

        fetch(url + '/alunoTurma/' + event.target.value,{
            method : 'DELETE',
        })
        .then(response => response.json())
        .then(dados => {
            alert('Matricula removida');

            listar();
        })
    }

    const limparCampos = () => {
        setId(0);
        setMatricula('');

    }


    return (

        <div className="bodygeral">
            <div className="body">
                <Menu />
                <Titulo titulo="AlunoTurma" chamada={<h2>Matriculas registradas</h2>} />
                            <div className="espaco">
                        <div className="bg">

                <Container>
                    
                        <div className="Fundo">


                    <Card>
                        <Card.Body>
                            <Form onSubmit={event => Cadastrar(event)}>
                                <Form.Group controlId="formTitulo">
                                    <FormLabel>Matricula</FormLabel>
                                    <Form.Control type="text" placeholder="Digite uma matricula nova" value={matricula} onChange={event => setMatricula(event.target.value)} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="success" type="submit">Salvar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card>
                    <Table  bordered className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Matricula</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alunosTurma.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                        
                                        <td>{item.matricula}</td>
                                        <td>{item.idTurma}</td>
                                        <td>{item.idUsuario}</td>
                                        <td>
                                            <Button type="button" variant="warning" value={item.idAlunoTurma} onClick={ event => editar(event)}>Editar</Button>
                                            <Button type="button" variant="danger" value={item.idAlunoTurma} style={{ marginLeft : '30px'}} onClick={ event => remover(event)}>Remover</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                            
                        </tbody>
                    </Table>
                        </Card>
                        </div>
                </Container>
                        </div>
                        </div>
            </div>

            <Rodape />
        </div >

    )
}

export default AlunoTurma;