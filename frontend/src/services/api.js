import supabase from './supabase';

export const equipamentoService = {
    listar: async () => await supabase.from("equipamentos").select("*"),
    criar: async (dados) => await supabase.from("equipamentos").insert([dados]),
    atualizar: async (id, dados) => await supabase.from("equipamentos").update(dados).eq("id", id),
    excluir: async (id) => await supabase.from("equipamentos").delete().eq("id", id)
};

export const cidadeService = {
    listar: async () => await supabase.from("cidades").select("*"),
    criar: async (dados) => await supabase.from("cidades").insert([dados]),
    atualizar: async (id, dados) => await supabase.from("cidades").update(dados).eq("id", id),
    excluir: async (id) => await supabase.from("cidades").delete().eq("id", id)
};

export const funcionarioService = {
    listar: async () => await supabase.from("funcionarios").select("*"),
    criar: async (dados) => await supabase.from("funcionarios").insert([dados]),
    atualizar: async (id, dados) => await supabase.from("funcionarios").update(dados).eq("id", id),
    excluir: async (id) => await supabase.from("funcionarios").delete().eq("id", id)
};

export const servicoService = {
    listar: async () => await supabase.from("servicos").select("*"),
    criar: async (dados) => await supabase.from("servicos").insert([dados]),
    atualizar: async (id, dados) => await supabase.from("servicos").update(dados).eq("id", id),
    excluir: async (id) => await supabase.from("servicos").delete().eq("id", id)
};