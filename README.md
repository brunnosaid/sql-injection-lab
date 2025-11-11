# SQL Injection Lab (local)

Projeto educacional para testar e entender SQL injection de forma segura e controlada.
**Uso permitido**: apenas em ambientes locais ou em sistemas onde você tem autorização.

## Requisitos
- Node.js 18+ e npm
- sqlite3 (será instalado pelo npm)

## Instalação e execução
1. Clone o repositório
2. `npm install`
3. `node init_db.js`  # cria db/database.sqlite com dados de teste
4. `node app.js`
5. Acesse `http://localhost:3000` no navegador

## Rotas de interesse
- `GET /` front
- `POST /login` rota vulnerável (exemplo)
- `GET /search?q=...` rota vulnerável para demonstrar injeção via query string

## Segurança
As rotas vulneráveis estão marcadas e há versões seguras comentadas usando prepared statements. Estude a diferença e sempre prefira prepared statements em produção.

## Disclaimer
Use apenas em ambiente controlado. Não atacar sistemas de terceiros.
