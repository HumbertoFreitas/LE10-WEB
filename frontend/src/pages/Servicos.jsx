import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';
import './Gerenciamento.css';

export default function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [tipoServico, setTipoServico] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        carregarServicos();
    }, []);

    const carregarServicos = async () => {
        try {
            const response = await servicoService.listar();
            setServicos(response.data);
        } catch (error) {
            console.error("Erro ao buscar serviços", error);
        }
    };

    const salvar = async () => {
        if (!tipoServico || !descricao || !status) return alert("Preencha todos os campos!");

        try {
            const dadosServico = { tipo_servico: tipoServico, descricao: descricao, status: status };

            if (editandoId) {
                await servicoService.atualizar(editandoId, dadosServico);
            } else {
                await servicoService.criar(dadosServico);
            }

            setTipoServico('');
            setDescricao('');
            setStatus('');
            setEditandoId(null);
            carregarServicos(); // Atualiza a lista após salvar
        } catch (error) {
            console.error("Erro ao salvar", error);
        }
    };

    // Puxa os dados do item para os campos de input
    const editar = (servico) => {
        setTipoServico(servico.tipo_servico);
        setDescricao(servico.descricao);
        setStatus(servico.status);
        setEditandoId(servico.id);
    };

    // Cancela a edição e limpa os campos
    const cancelarEdicao = () => {
        setTipoServico('');
        setDescricao('');
        setStatus('');
        setEditandoId(null);
    };

    const excluir = async (id) => {
        if (!window.confirm("Deseja realmente excluir este serviço?")) return;

        try {
            await servicoService.excluir(id);
            carregarServicos(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao excluir", error);
        }
    };

    return (
        <div className="container-gerenciamento">
            <h2>Gestão de Serviços</h2>

            <div className="form-gerenciamento">
                <h3>{editandoId ? 'Editar Serviço' : 'Novo Serviço'}</h3>

                <input
                    type="text"
                    className="input-gerenciamento"
                    placeholder="Tipo (Ex: Escavação)"
                    value={tipoServico}
                    onChange={(e) => setTipoServico(e.target.value)}
                />

                <input
                    type="text"
                    className="input-gerenciamento"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <input
                    type="text"
                    className="input-gerenciamento"
                    placeholder="Status (Ex: Em andamento)"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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

            <h3>Serviços Cadastrados</h3>
            <ul>
                {servicos.map(servico => (
                    <li key={servico.id} className="item-lista">
                        <strong>{servico.tipo_servico}</strong> - {servico.descricao} | <em>Status: {servico.status}</em>

                        <button className="btn-editar" onClick={() => editar(servico)}>
                            Editar
                        </button>

                        <button className="btn-excluir" onClick={() => excluir(servico.id)}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}