import React, { useEffect, useState } from 'react';
import Menu from '../../../components/menu';
import Rodape from '../../../components/rodape';
import Titulo from '../../../components/titulo';

import './index.css'
import { Form, Button, Container, Card, Row, FormLabel, Col, Table } from 'react-bootstrap';
import { url } from '../../../utils/constants';

const Turma = () => {

    const [id, setId] = useState(0);
    const [descricao,  setDescricao] = useState('');
    const [idCurso, setIdCurso] = useState('');
    const [Turma, setTurma] = useState([])

    useEffect(() => {
        listar();
    }, [])

    const Cadastrar = (event) => {
        event.preventDefault();

        const Turma = {
           descricao: descricao,
           idCurso: 'dc65a8d7-5497-4761-b9e8-048695bbd389',
        }

        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/turma` :  `${url}/turma/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(Turma),
            headers : {
                'content-type' : 'application/json',
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Turma salva');

            listar();
        })
        .catch(err => console.error(err))
    }


    const listar = () => {

        fetch(`${url}/Turma`)
            .then(response => response.json())
            .then(dados => {
                setTurma(dados.data);
                
                limparCampos();
            })
            .catch(err => console.error(err));
    }


    const editar = (event) => {
        event.preventDefault();

        fetch(url + '/turma/' + event.target.value, {
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-edux')
            }
        })
        .then(response => response.json())
        .then(dado => {
            setId(dado.id);
            setDescricao(dado.descricao);
        })
    }




    const remover = (event) => {
        event.preventDefault();

        fetch(url + '/Turma/' + event.target.value,{
            method : 'DELETE',
        })
        .then(response => response.json())
        .then(dados => {
            alert('Turma removida');

            listar();
        })
    }

    const limparCampos = () => {
        setId(0);
        setDescricao('');

    }


    return (

        <div className="bodygeral">
            <div className="body">
                <Menu />
                <Titulo titulo="Turma" chamada={<h2>Turmas registradas</h2>} />
                <Container>
                    
                    <Card>
                        <Card.Body>
                            <Form onSubmit={event => Cadastrar(event)}>
                                <Form.Group controlId="formTitulo">
                                    <FormLabel>Descrição</FormLabel>
                                    <Form.Control type="text" placeholder="Digite uma descrição nova" value={descricao} onChange={event => setDescricao(event.target.value)} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="success" type="submit">Salvar</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Table  bordered className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Turma.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        
                                        <td>{item.idTurma}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.idCurso}</td>
                                        <td>
                                            <Button type="button" variant="warning" value={item.idTurma} onClick={ event => editar(event)}>Editar</Button>
                                            <Button type="button" variant="danger" value={item.idTurma} style={{ marginLeft : '30px'}} onClick={ event => remover(event)}>Remover</Button>
                                        </td>
                                    </tr>
                                )
                                })
                            }
                            
                        </tbody>
                    </Table>

                </Container>
            </div>

            <Rodape />
        </div >

    )
}

export default Turma;