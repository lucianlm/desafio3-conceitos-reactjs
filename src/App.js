import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);  
  
  useEffect(() => {
    async function loadRepositories(){
      const response = await api.get('repositories');
      setRepositories(response.data);
    }
    loadRepositories();
  }, []); 
  
  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: "https://github.com/lucianlm/desafio-conceitos-node",
      techs: ["Node.js", "ReactJS", "React Native"],
      likes: 0
    });
    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepos = repositories.filter(repo => repo.id !== id);

    setRepositories(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
