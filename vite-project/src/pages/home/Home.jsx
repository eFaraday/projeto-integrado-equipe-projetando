import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">O que é o Instituto Vorp?</h1>
      <p className="home-mission">
        O Instituto Vorp nasceu com uma missão clara: apoiar projetos sociais já existentes, capacitar pessoas em situação de vulnerabilidade e levar dignidade a quem mais precisa.
      </p>

      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number">+400</span>
          <span className="stat-label">refeições</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">+200 pessoas</span>
          <span className="stat-label">ajudadas diretamente</span>
        </div>
      </div>

      <p className="collective-text">
        E isso só foi possível com a união de pessoas que acreditam no poder do coletivo.
      </p>

      <a href="https://wa.me/5585996830441?text=Ol%C3%A1%2C%20quero%20ajudar%20pessoas%20pelo%20Instituto%20Vorp!" className="btn-subscribe" target="_blank" rel="noopener noreferrer">
        Quero ser assinante
      </a>
    </div>
  );
};

export default Home;
