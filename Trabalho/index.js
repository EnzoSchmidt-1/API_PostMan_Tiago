const express = require('express');
const app = express();
const PORT = 3001;
app.use(express.json());


const filmes = [
  { 
    id: 1,
    titulo: "O Poderoso Chefão", 
    ano: 1972, 
    diretor: "Francis Ford Coppola", 
    genero: "Crime",
    nota : 9.2},

  { 
    id: 2, 
    titulo: "Interestelar", 
    ano: 2014, 
    diretor: "Christopher Nolan", 
    genero: "Ficção Científica",
    nota: 8.7},

  { 
    id: 3, 
    titulo: "Pulp Fiction", 
    ano: 1994, 
    diretor: "Quentin Tarantino", 
    genero: "Crime" ,
    nota : 8.9},

  { 
    id: 4, 
    titulo: "Cidade de Deus", 
    ano: 2002, 
    diretor: "Fernando Meirelles", 
    genero: "Drama" ,
    nota : 9},

  { 
    id: 5, 
    titulo: "O Senhor dos Anéis", 
    ano: 2001, 
    diretor: "Peter Jackson", 
    genero: "Fantasia" ,
    nota : 9},
  { 
    id: 6, 
    titulo: "Matrix", 
    ano: 1999, 
    diretor: "Lana e Lilly Wachowski", 
    genero: "Ação", 
    nota: 8.5},
  { 
    id: 7, 
    titulo: "Parasita", 
    ano: 2019, 
    diretor: "Bong Joon-ho", 
    genero: "Suspense",
    nota: 8.5},
  { 
    id: 8, 
    titulo: "O iluminado", 
    ano: 1980, 
    diretor: "Stanley Kubrick", 
    genero: "Terror",
    nota: 8.4},

  { 
    id: 9, 
    titulo: "A viagem de Chihiro", 
    ano: 2001, 
    diretor: "Hayao Miyazaki", 
    genero: "Animação",
    nota :8.6},

  { 
    id: 10, 
    titulo: "Clube da luta", 
    ano: 1999, 
    diretor: "David Fincher", 
    genero: "Drama",
    nota : 9},

];

//-----------------------------------------------------------------------------------
//GET's
app.get('/api/filmes/:id', (req, res) => {
  const idBusca = parseInt(req.params.id);
  const filme = filmes.find(f => f.id === idBusca);

  if (!filme) return res.status(404).json({ erro: "Filme não encontrado" });

  res.json(filme);
});


app.get('/api/filmes', (req, res) => {
  let resultado = [...filmes]; 

  const { genero, sort, order } = req.query;

  if (genero) {
    resultado = resultado.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
  }

  if (sort) {
    resultado.sort((a, b) => {
      let valA = a[sort];
      let valB = b[sort];
      
      if (order === 'desc') return valB > valA ? 1 : -1;
      return valA > valB ? 1 : -1;
    });
  }

  res.json(resultado); 
});

app.get('/api/filmes', (req, res) => {
    
    res.json({filmes});

});
//-------------------------------------------------------------------------------------

// POST
app.post('/api/filmes', (req, res) => {
  const novoFilme = {
    id: filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1,
    titulo: req.body.titulo,
    ano: req.body.ano,
    genero: req.body.genero,
    nota: req.body.nota || 0
  };

  if (!novoFilme.titulo || !novoFilme.genero) {
    return res.status(400).json({ erro: "Título e Gênero são obrigatórios!" });
  }

  filmes.push(novoFilme);
  
  res.status(201).json(novoFilme);
});

// PUT
app.put('/api/filmes/:id', (req, res) => {
    // 1. Pegar ID da URL
    const id = parseInt(req.params.id);
    
    // 2. Buscar filme no array
    const filme = filmes.find(p => p.id === id);
    
    // 3. Verificar se existe
    if (!filme) {
        return res.status(404).json({ 
            erro: "filme não encontrado" 
        });
    }
    
    // 4. Extrair dados do body
    const { titulo, ano, diretor, genero, nota} = req.body;
    
    // 5. VALIDAÇÕES (igual ao POST!)
    if (!titulo || !ano || !diretor ||!genero) {
        return res.status(400).json({
            erro: "Campos obrigatórios: titulo, ano, diretor e genero"
        });
    }
    
    if (typeof ano !== 'number' || ano <= 0) {
        return res.status(400).json({
            erro: "O ano de criação deve ser um número positivo"
        });
    }
    
    // 6. Atualizar campos do filme
    filme.titulo = titulo;
    filme.ano = ano;
    filme.diretor = diretor;
    filme.genero = genero;
    filme.nota = nota;

    
    // 7. Retornar filme atualizado com 200 OK
    res.json(filme);
});
                        
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});