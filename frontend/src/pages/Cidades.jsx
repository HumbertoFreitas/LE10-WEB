import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';
import './Gerenciamento.css';

export default function Cidades() {
    const [cidades, setCidades] = useState([]);
    const [nome, setNome] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        carregarCidades();
    }, []);

    const carregarCidades = async () => {
        try {
            const response = await cidadeService.listar();
            setCidades(response.data);
        } catch (error) {
            console.error("Erro ao buscar cidades", error);
        }
    };

    const salvar = async () => {
        if (!nome) return alert("Preencha o campo do nome!");

        try {
            if (editandoId) {
                await cidadeService.atualizar(editandoId, { nome });
            } else {
                await cidadeService.criar({ nome });
            }

            setNome('');
            setEditandoId(null);
            carregarCidades(); // Atualiza a lista após cadastrar
        } catch (error) {
            console.error("Erro ao salvar", error);
        }
    };

    // Puxa os dados do item para os campos de input
    const editar = (cidade) => {
        setNome(cidade.nome);
        setEditandoId(cidade.id);
    };

    // Cancela a edição e limpa os campos
    const cancelarEdicao = () => {
        setNome('');
        setEditandoId(null);
    };

    const excluir = async (id) => {
        if (!window.confirm("Deseja realmente excluir esta cidade?")) return;

        try {
            await cidadeService.excluir(id);
            carregarCidades(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao excluir", error);
        }
    };

    return (
        <div className="container-gerenciamento">
            <h2>Gestão de Cidades</h2>

            <div className="form-gerenciamento">
                <h3>{editandoId ? 'Editar Cidade' : 'Nova Cidade'}</h3>

                <input
                    type="text"
                    className="input-gerenciamento"
                    placeholder="Nome da Cidade"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <button className="btn-principal" onClick={salvar}>
                    {editandoId ? 'Atualizar' : 'Cadastrar'}
                </button>

                {editandoId && (
                    <button className="btn-cancelar" onClick={cancelarEdicao}>
                        Cancelar
                    </button>
                )}
            </div>

            <h3>Cidades Cadastradas</h3>
            <ul>
                {cidades.map(cidade => (
                    <li key={cidade.id} className="item-lista">
                        <strong>{cidade.nome}</strong>

                        <button className="btn-editar" onClick={() => editar(cidade)}>
                            Editar
                        </button>

                        <button className="btn-excluir" onClick={() => excluir(cidade.id)}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}