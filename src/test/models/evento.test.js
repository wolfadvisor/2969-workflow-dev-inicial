/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, it } from '@jest/globals';
import Evento from '../../models/evento.js';

describe('Testando o modelo Evento', () => {
  const objetoEvento = {
    nome: 'Evento Teste',
    descricao: 'Descrção do evento teste',
    data: '2026-10-22',
    autor_id: 1,
  };

  it('Deve instanciar um novo autor', () => {
    const evento = new Evento(objetoEvento);

    expect(evento).toEqual(expect.objectContaining(objetoEvento));
  });
});
