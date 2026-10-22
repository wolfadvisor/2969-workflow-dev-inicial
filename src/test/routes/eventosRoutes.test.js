/* eslint-disable no-unused-expressions */
import { after } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import db from '../../db/dbconfig.js';

chai.use(chaiHttp);
const { expect } = chai;

after(async () => {
  await db.destroy();
});

describe('GET em /eventos', () => {
  it('Deve retornar uma lista de eventos', (done) => {
    chai
      .request(app)
      .get('/eventos')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        expect(res.body[0]).to.have.property('descricao');
        done();
      });
  });

  it('Deve retornar um evento', (done) => {
    const idEvento = 1;
    chai
      .request(app)
      .get(`/eventos/${idEvento}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('nome');
        expect(res.body[0]).to.have.property('descricao');
        done();
      });
  });

  it('Não deve retornar um evento com id inválido', (done) => {
    const idEvento = 'A';
    chai
      .request(app)
      .get(`/eventos/${idEvento}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property('message')
          .eql(`id ${idEvento} não encontrado`);
        done();
      });
  });
});

describe('POST em /eventos', () => {
  it('Deve criar um novo evento', (done) => {
    const evento = {
      nome: 'Teste Testinho',
      descricao: 'Testelândia',
    };
    chai
      .request(app)
      .post('/eventos')
      .set('Accept', 'application/json')
      .send(evento)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').eql('evento criado');
        done();
      });
  });

  it('Não deve criar um evento ao receber body vazio', (done) => {
    const evento = {};
    chai
      .request(app)
      .post('/evento')
      .set('Accept', 'application/json')
      .send(evento)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('message')
          .eql('corpo da requisição vazio');
        done();
      });
  });
});

describe('PUT em /eventos', () => {
  it('Deve atualizar um evento', (done) => {
    const idEvento = 2;
    const eventoAtualizado = {
      nome: 'Outro Nome',
      descricao: 'Tangamandápio',
    };
    chai
      .request(app)
      .put(`/eventos/${idEvento}`)
      .set('Accept', 'application/json')
      .send(eventoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.content[0]).to.include({
          nome: eventoAtualizado.nome,
          descricao: eventoAtualizado.descricao,
        });
        done();
      });
  });

  it('Não deve atualizar um evento com id inválido', (done) => {
    const idEvento = 'A';
    const eventoAtualizado = {
      nome: 'Atualizando Novamente',
    };
    chai
      .request(app)
      .put(`/eventos/${idEvento}`)
      .set('Accept', 'application/json')
      .send(eventoAtualizado)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property('message')
          .eql(`id ${idEvento} não encontrado`);
        done();
      });
  });
});

describe('DELETE em /eventos', () => {
  it('Deve deletar um evento', (done) => {
    const idEvento = 4;
    chai
      .request(app)
      .delete(`/autores/${idEvento}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').eql('evento excluído');
        done();
      });
  });

  it('Não deve deletar um evento com id inválido', (done) => {
    const idEvento = 'A';
    chai
      .request(app)
      .delete(`/autores/${idEvento}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body)
          .to.have.property('message')
          .eql(`Autor com id ${idEvento} não encontrado`);
        done();
      });
  });
});
