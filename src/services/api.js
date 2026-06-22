// Este é um arquivo temporário para evitar que o Front-end quebre.
// Vai ser substituido pela conexão real com o Back-end.

export const equipamentoService = {
    listar: async () => { return { data: [] } },
    criar: async (dados) => { console.log("Equipamento simulado:", dados); return { data: dados } }
};

export const cidadeService = {
    listar: async () => { return { data: [] } },
    criar: async (dados) => { console.log("Cidade simulada:", dados); return { data: dados } }
};

export const funcionarioService = {
    listar: async () => { return { data: [] } },
    criar: async (dados) => { console.log("Funcionário simulado:", dados); return { data: dados } }
};

export const servicoService = {
    listar: async () => { return { data: [] } },
    criar: async (dados) => { console.log("Serviço simulado:", dados); return { data: dados } }
};