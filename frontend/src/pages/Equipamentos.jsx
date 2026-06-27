import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';
import './Gerenciamento.css';

export default function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        carregarEquipamentos();
    }, []);

    const carregarEquipamentos = async () => {
        try {
            const response = await equipamentoService.listar();
            setEquipamentos(response.data);
        } catch (error) {
            console.error("Erro ao buscar equipamentos", error);
        }
    };

    const salvar = async () => {
        if (!nome || !setor) return alert("Preencha todos os campos!");

        try {
            if (editandoId) {
                await equipamentoService.atualizar(editandoId, { nome, setor });
            } else {
                await equipamentoService.criar({ nome, setor });
            }

            setNome('');
            setSetor('');
            carregarEquipamentos(); // Atualiza a lista após cadastrar
        } catch (error) {
            console.error("Erro ao salvar", error);
        }
    };

    // Puxa os dados do item para os campos de input
    const editar = (eq) => {
        setNome(eq.nome);
        setSetor(eq.setor);
        setEditandoId(eq.id);
    };

    // Cancela a edição e limpa os campos
    const cancelarEdicao = () => {
        setNome('');
        setSetor('');
        setEditandoId(null);
    };

    const excluir = async (id) => {
        if (!window.confirm("Deseja realmente excluir este equipamento?")) return;

        try {
            await equipamentoService.excluir(id);
            carregarEquipamentos(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao excluir", error);
        }
    };

    return (
        <div className="container-gerenciamento">
            <h2>Gestão de Equipamentos</h2>

            <div className="form-gerenciamento">
                <h3>{editandoId ? 'Editar Equipamento' : 'Novo Equipamento'}</h3>

                <input
                    type="text"
                    className="input-gerenciamento"
                    placeholder="Nome do Equipamento"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    type="text"
                    className="input-gerenciamento"
                    placeholder="Setor (Ex: Extração)"
                    value={setor}
                    onChange={(e) => setSetor(e.target.value)}
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

            <h3>Equipamentos Cadastrados</h3>
            <ul>
                {equipamentos.map(eq => (
                    <li key={eq.id} className="item-lista">
                        <strong>{eq.nome}</strong> - Setor: {eq.setor}

                        <button className="btn-editar" onClick={() => editar(eq)}>
                            Editar
                        </button>

                        <button className="btn-excluir" onClick={() => excluir(eq.id)}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}