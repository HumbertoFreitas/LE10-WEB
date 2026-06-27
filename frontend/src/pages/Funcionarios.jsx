import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';
import './Gerenciamento.css';

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [setor, setSetor] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    const carregarFuncionarios = async () => {
        try {
            const response = await funcionarioService.listar();
            setFuncionarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar funcionários", error);
        }
    };

    const salvar = async () => {
        if (!nome || !cargo || !setor) return alert("Preencha todos os campos!");

        try {
            if (editandoId) {
                await funcionarioService.atualizar(editandoId, { nome, cargo, setor });
            } else {
                await funcionarioService.criar({ nome, cargo, setor });
            }
            
            setNome('');
            setCargo('');
            setSetor('');
            setEditandoId(null);
            carregarFuncionarios(); // Atualiza a lista após salvar
        } catch (error) {
            console.error("Erro ao salvar", error);
        }
    };

    // Puxa os dados do item para os campos de input
    const editar = (func) => {
        setNome(func.nome);
        setCargo(func.cargo);
        setSetor(func.setor);
        setEditandoId(func.id);
    };

    // Cancela a edição e limpa os campos
    const cancelarEdicao = () => {
        setNome('');
        setCargo('');
        setSetor('');
        setEditandoId(null);
    };

    const excluir = async (id) => {
        if (!window.confirm("Deseja realmente excluir este funcionário?")) return;
        
        try {
            await funcionarioService.excluir(id);
            carregarFuncionarios(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao excluir", error);
        }
    };

    return (
        <div className="container-gerenciamento">
            <h2>Gestão de Funcionários</h2>

            <div className="form-gerenciamento">
                <h3>{editandoId ? 'Editar Funcionário' : 'Novo Funcionário'}</h3>
                
                <input 
                    type="text" 
                    className="input-gerenciamento" 
                    placeholder="Nome do Funcionário" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)} 
                />
                
                <input 
                    type="text" 
                    className="input-gerenciamento" 
                    placeholder="Cargo (Ex: Operador)" 
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)} 
                />
                
                <input 
                    type="text" 
                    className="input-gerenciamento" 
                    placeholder="Setor (Ex: Manutenção)" 
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
            
            <h3>Funcionários Cadastrados</h3>
            <ul>
                {funcionarios.map(func => (
                    <li key={func.id} className="item-lista">
                        <strong>{func.nome}</strong> - {func.cargo} | <em>Setor: {func.setor}</em>
                        
                        <button className="btn-editar" onClick={() => editar(func)}>
                            Editar
                        </button>
                        
                        <button className="btn-excluir" onClick={() => excluir(func.id)}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}