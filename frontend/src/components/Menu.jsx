import React from 'react';
import './Menu.css';

export default function Menu({ setPagina }) {
    return (
        <nav className="menu-nav">
            <button className="menu-btn" onClick={() => setPagina('inicio')}>
                Início
            </button>
            
            <button className="menu-btn" onClick={() => setPagina('equipamentos')}>
                Equipamentos
            </button>
            
            <button className="menu-btn" onClick={() => setPagina('cidades')}>
                Cidades
            </button>
            
            <button className="menu-btn" onClick={() => setPagina('funcionarios')}>
                Funcionários
            </button>
            
            <button className="menu-btn" onClick={() => setPagina('servicos')}>
                Serviços
            </button>
        </nav>
    );
}