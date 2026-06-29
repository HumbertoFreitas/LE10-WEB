import React from 'react';
import './Inicio.css';

export default function Inicio() {
    return (
        <div className="inicio-container">
            <div className="inicio-icone">🏭</div>
            <h1 className="inicio-titulo">Sistema Integrado da Mineradora</h1>
            <p className="inicio-texto">
                Bem-vindo ao painel de controle. Utilize o menu de navegação acima para gerenciar os equipamentos, cidades, funcionários e serviços com facilidade.
            </p>
        </div>
    );
}