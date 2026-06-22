import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');

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

    const cadastrar = async () => {
        if (!nome || !setor) return alert("Preencha todos os campos!");

        try {
            await equipamentoService.criar({ nome, setor });
            setNome('');
            setSetor('');
            carregarEquipamentos(); // Atualiza a lista após cadastrar
        } catch (error) {
            console.error("Erro ao cadastrar", error);
        }
    };

    return (
        <div>
            <h2>Gestão de Equipamentos</h2>

            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Novo Equipamento</h3>
                
                <input type="text" placeholder="Nome do Equipamento" value={nome}
                    onChange={(e) => setNome(e.target.value)} style={{ marginRight: '10px' }} />
                
                <input type="text" placeholder="Setor (Ex: Extração)" value={setor}
                    onChange={(e) => setSetor(e.target.value)} style={{ marginRight: '10px' }} />
                
                <button onClick={cadastrar}>Cadastrar</button>
            </div>
            <h3>Equipamentos Cadastrados</h3>
            <ul>
                {equipamentos.map(eq => (
                    <li key={eq.id}>
                        <strong>{eq.nome}</strong> - Setor: {eq.setor}
                    </li>
                ))}
            </ul>
        </div>
    );
}