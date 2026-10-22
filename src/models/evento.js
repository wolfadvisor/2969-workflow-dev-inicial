/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */

import db from '../db/dbconfig.js';

class Evento {
  constructor({ id, nome, descricao, data, autor_id, created_at, updated_at }) {
    this.id = null || id;
    this.nome = nome;
    this.descricao = descricao;
    this.data = data;
    this.autor_id = autor_id;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarEventos() {
    return [
      {
        id: 1,
        nome: 'Lançamento',
        descricao: 'descrição',
        data: '2026-22-10',
        autor_id: 1,
        created_at: '2026-22-10',
        updated_at: '2026-22-10',
      },
    ];
  }

  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('autores').where({ id });
    return resultado[0];
  }

  async criar() {
    const novoEvento = {
      nome: this.nome,
      descricao: this.descricao,
      data: this.data,
      autor_id: this.autor_id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
    return db('autores').insert(novoEvento);
  }

  async atualizar(id) {
    // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await db('autores')
      .where({ id })
      .update({ ...this, updated_at: new Date().toISOString() });

    return db.select('*').from('autores').where({ id });
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    return db('autores').where({ id }).del();
  }

  async salvar() {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (this.id) {
      const resultado = await this.atualizar(this.id);
      return resultado;
    }
    const resultado = await this.criar();
    return resultado;
  }
}

export default Evento;
