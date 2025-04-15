// src/seed/seed.ts
import { AppDataSource } from './data-source';
import { User } from '../database/entities/user.entity';
import { Board } from '../database/entities/board.entity';
import { List } from '../database/entities/list.entity';
import { Task } from '../database/entities/task.entity';
import * as bcrypt from 'bcrypt';

const usuarios = ['alice', 'bob', 'carol', 'dave', 'eve', 'frank']
const listaTitulos = [
  'A Fazer',
  'Em Progresso',
  'Concluído',
  'Em Revisão',
  'Planejamento',
  'Testes',
  'Design',
  'Backlog',
];const tarefasExemplo = [
  { title: 'Criar layout inicial', description: 'Desenhar a estrutura base no Figma' },
  { title: 'Implementar autenticação', description: 'Login, cadastro e proteção de rotas' },
  { title: 'Integrar API externa', description: 'Conectar com a API do OpenWeather' },
  { title: 'Corrigir bug na tela de tarefas', description: 'Erro ao mover tarefas entre listas' },
  { title: 'Escrever testes automatizados', description: 'Cobertura mínima de 80%' },
  { title: 'Documentar endpoints', description: 'Gerar documentação com Swagger' },
  { title: 'Deploy na Vercel', description: 'Publicar aplicação no ambiente de produção' },
  { title: 'Criar protótipos de alta fidelidade', description: 'Melhorar a experiência visual com protótipos finais' },
  { title: 'Escrever README', description: 'Documentar instalação e uso no repositório GitHub' },
  { title: 'Refatorar código do Dashboard', description: 'Melhorar organização e reusabilidade dos componentes' },
  { title: 'Configurar ESLint e Prettier', description: 'Padronizar código com linters e formatadores' },
  { title: 'Reunião de alinhamento', description: 'Discutir progresso com equipe na daily' },
  { title: 'Criar banco de dados inicial', description: 'Modelar entidades e relacionamentos no PostgreSQL' },
  { title: 'Implementar Dark Mode', description: 'Permitir troca entre temas claro e escuro' },
  { title: 'Analisar feedback dos usuários', description: 'Revisar respostas coletadas via formulário' },
  { title: 'Ajustar responsividade', description: 'Corrigir problemas em telas menores de 768px' },
  { title: 'Adicionar validação nos formulários', description: 'Validar campos obrigatórios e e-mail com regex' },
  { title: 'Criar sistema de comentários', description: 'Permitir discussões nas tarefas' },
  { title: 'Implementar drag and drop', description: 'Arrastar tarefas entre colunas com biblioteca react-beautiful-dnd' },
  { title: 'Exportar relatórios em PDF', description: 'Gerar relatórios de desempenho do projeto' },
  { title: 'Criar componente de loading', description: 'Exibir indicador de carregamento durante requisições' },
  { title: 'Testar integração com Stripe', description: 'Validar pagamentos com cartão de crédito' },
  { title: 'Revisar políticas de segurança', description: 'Evitar XSS, CSRF e SQL Injection' },
  { title: 'Implementar feature de favoritos', description: 'Permitir marcar itens como favoritos' },
  { title: 'Conectar com Firebase para notificações', description: 'Enviar alertas em tempo real via Firebase Cloud Messaging' },
  { title: 'Gerar seed de dados fictícios', description: 'Preencher banco com dados de exemplo para testes' },
  { title: 'Realizar testes de performance', description: 'Medir tempos de resposta com Lighthouse' },
  { title: 'Criar página 404 personalizada', description: 'Melhorar experiência em rotas inexistentes' },
  { title: 'Adicionar paginação na listagem', description: 'Carregar dados por página para melhorar performance' },
  { title: 'Fazer backup do banco de dados', description: 'Exportar dump e armazenar em local seguro' },
];

async function seed() {
  await AppDataSource.initialize();
  console.log('🌱 Iniciando seed...');

  const userRepo = AppDataSource.getRepository(User);
  const boardRepo = AppDataSource.getRepository(Board);
  const listRepo = AppDataSource.getRepository(List);
  const taskRepo = AppDataSource.getRepository(Task);

  const users = await Promise.all(
    usuarios.map(async (name) => {
      const user = userRepo.create({
        name,
        email: `${name}@email.com`,
        password: await bcrypt.hash('123456', 10),
      });
      return userRepo.save(user);
    })
  );

  for (const user of users) {
    // Cada usuário vai criar 2 boards
    for (let i = 1; i <= 2; i++) {
      const board = boardRepo.create({
        title: `Projeto ${i} de ${user.name}`,
        description: `Board de ${user.name} para o projeto ${i}`,
        owner: user,
        members: [],
      });
      await boardRepo.save(board);

      const listas = await Promise.all(
        listaTitulos.map((titulo) => {
          const list = listRepo.create({
            title: titulo,
            board,
          });
          return listRepo.save(list);
        })
      );

      for (const list of listas) {
        const tarefasAleatorias = tarefasExemplo
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const tarefas = tarefasAleatorias.map((tarefa) =>
          taskRepo.create({
            title: tarefa.title,
            description: tarefa.description,
            completed: list.title === 'Concluído',
            list,
          })
        );

        await taskRepo.save(tarefas);
      }
    }
  }

  console.log('✅ Seed concluído com sucesso!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Erro ao rodar seed:', err);
  AppDataSource.destroy();
});
