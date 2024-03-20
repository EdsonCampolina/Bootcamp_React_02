import './styles.css';

import { useState } from 'react';
import axios from 'axios';

type FormData = {
  user: string;
};

type Profile = {
  avatar_url: string;
  url: string;
  name: string;
  location: string;
  followers: number;
};

const GithubPage = () => {
  const [profile, setProfile] = useState<Profile>();

  const [formData, setFormData] = useState<FormData>({
    user: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    axios
      .get(`https://api.github.com/users/${formData.user}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        setProfile(undefined);
      });
  };

  return (
    <div className="github-search-container">
      <div className="search-container">
        <h1>Encontre um perfil Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
              name="user"
              value={formData.user}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>

      {profile && (
        <>
          <div className="result-container">
            <div className="img-container">
              <img src={profile.avatar_url} alt="foto" />
            </div>
            <div className="result-information">
              <h5>Informações</h5>
              <div className="result-information-data">
                <h5>Perfil:</h5>
                <p className="url">{profile.url}</p>
              </div>
              <div className="result-information-data">
                <h5>Seguidores:</h5>
                <p>{profile.followers}</p>
              </div>
              <div className="result-information-data">
                <h5>Localidade:</h5>
                <p>{profile.location}</p>
              </div>
              <div className="result-information-data">
                <h5>Nome:</h5>
                <p>{profile.name}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GithubPage;
