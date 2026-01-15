import React from 'react';
import './Donate.css';

const Donate = () => {
  const handleDonate = () => {
    window.open("https://wa.me/5585996830441?text=Ol%C3%A1%2C%20quero%20ajudar%20pessoas%20pelo%20Instituto%20Vorp!", "_blank");
  };

  return (
    <div className="donate-container">
      <h2 className="donate-title">Escolha o valor da sua doação e colabore!</h2>

      <div className="donate-box">
        <div className="donate-item">
          Apoie com R$ 10,00
          <button className="btn-donate" onClick={handleDonate}>Doar</button>
        </div>

        <div className="donate-item gray">
          Apoie com R$ 20,00
          <button className="btn-donate" onClick={handleDonate}>Doar</button>
        </div>

        <div className="donate-item">
          Apoie com R$ 30,00
          <button className="btn-donate" onClick={handleDonate}>Doar</button>
        </div>

        <div className="donate-item lightblue">
          Apoie com R$ 40,00
          <button className="btn-donate" onClick={handleDonate}>Doar</button>
        </div>

        <div className="donate-item">
          Apoie com R$ 50,00
          <button className="btn-donate" onClick={handleDonate}>Doar</button>
        </div>

        <div className="input-free-container">
          <span>R$</span>
          <input type="text" className="input-free" placeholder="0,00" />
          <button className="btn-donate-free" onClick={handleDonate}>Doar</button>
        </div>
      </div>
    </div>
  );
};

export default Donate;
