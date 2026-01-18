import React, { useState } from 'react';
import Papa from 'papaparse';
import './ImportCsv.css';

const ImportCsv = () => {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsLoading(true);
            setFileName(file.name);
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setHeaders(results.meta.fields);
                    setData(results.data);
                    setIsLoading(false);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                    setIsLoading(false);
                }
            });
        }
    };

    const handleClearData = () => {
        setData([]);
        setHeaders([]);
        setFileName('');
    };

    return (
        <div className="import-csv-container">
            <div className="header-section">
                <h1>📊 Doadores</h1>
                <p className="subtitle">Gerencie e visualize os dados dos doadores</p>
            </div>

            <div className="upload-section">
                <div className="file-upload-wrapper">
                    <label htmlFor="csv-input" className="file-upload-label">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Carregar Arquivo CSV
                    </label>
                    <input
                        id="csv-input"
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="file-upload-input"
                    />
                    {fileName && (
                        <div className="file-info">
                            <span className="file-name">📄 {fileName}</span>
                            <button onClick={handleClearData} className="clear-btn">✕</button>
                        </div>
                    )}
                </div>

                {isLoading && (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Carregando dados...</p>
                    </div>
                )}
            </div>

            {data.length > 0 && !isLoading && (
                <>
                    <div className="stats-section">
                        <div className="stat-card">
                            <div className="stat-icon">👥</div>
                            <div className="stat-content">
                                <h3>{data.length}</h3>
                                <p>Total de Doadores</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">📋</div>
                            <div className="stat-content">
                                <h3>{headers.length}</h3>
                                <p>Campos de Dados</p>
                            </div>
                        </div>
                    </div>

                    <div className="table-container">
                        <div className="table-header">
                            <h2>Dados dos Doadores</h2>
                            <span className="record-count">{data.length} registros</span>
                        </div>
                        <div className="table-wrapper">
                            <table className="csv-table">
                                <thead>
                                    <tr>
                                        <th className="row-number">#</th>
                                        {headers.map((header) => (
                                            <th key={header}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index}>
                                            <td className="row-number">{index + 1}</td>
                                            {headers.map((header) => (
                                                <td key={`${index}-${header}`}>{row[header] || '-'}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {data.length === 0 && !isLoading && !fileName && (
                <div className="empty-state">
                    <div className="empty-icon">📂</div>
                    <h3>Nenhum arquivo carregado</h3>
                    <p>Faça upload de um arquivo CSV para visualizar os dados dos doadores</p>
                </div>
            )}
        </div>
    );
};

export default ImportCsv;
