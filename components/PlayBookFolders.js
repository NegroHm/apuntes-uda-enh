import React, { useState, useEffect } from "react";
import { useRouter } from 'next/dist/client/router';
import axios from "axios";
import config from "../lib/config"; // Asegúrate que este archivo exporte tu API Key y Folder ID
import styles from '../styles/Home.module.css'
// Se elimina la importación de 'handleAccessTokenExpiration' porque ya no es necesaria
import Link from 'next/link';

const PlayBookFolders = () => {
  const router = useRouter();
  // Esta lógica permite navegar a subcarpetas. Usa la carpeta principal por defecto.
  const targetFolderId  = (typeof router.query.fid != 'undefined' ) ? router.query.fid : config.directory.target_folder;
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay un ID de carpeta, no se hace nada.
    if (!targetFolderId) {
        return;
    }

    const getFiles = async () => {
      setLoading(true);
      setError(null);
      setResults([]);

      // --- INICIO DE LA NUEVA LÓGICA ---
      try {
        // Lee la clave de API y el ID de la carpeta desde el archivo de configuración.
        const apiKey = config.api.key; // Asume que config.js exporta la API Key
        
        // Construye la consulta para buscar solo carpetas dentro de la carpeta padre.
        const query = `mimeType='application/vnd.google-apps.folder' and trashed = false and parents in '${targetFolderId}'`;

        // Construye la URL completa para la petición a la API de Google Drive.
        // La clave de API se añade como un parámetro al final (&key=...).
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&supportsAllDrives=true&includeTeamDriveItems=true`;

        // Se hace la petición GET sin cabeceras de autorización.
        const res = await axios.get(url);

        setResults(res.data.files);
      } catch (err) {
        console.error("Error al buscar los archivos de Google Drive:", err);
        setError(err); // Guarda el error para mostrar un mensaje al usuario.
      }
      // --- FIN DE LA NUEVA LÓGICA ---

      setLoading(false);
    };

    getFiles();
  }, [targetFolderId]); // El efecto se ejecuta cada vez que cambia el ID de la carpeta.

  return (
      <div className="flex flex-1 items-center justify-center w-full">
        {loading && <div style={{ display: "none" }}>Cargando...</div>}
        {error && <div className="text-red-500">Error al cargar las carpetas. Asegúrate de que la carpeta de Drive es pública y la API Key es correcta.</div>}
        <div className={styles.grid}>
          {results.map(result => (
              <Link
                  href={{
                    pathname: `/list/[fid]`,
                    query: {
                      fid: result.id
                    },
                  }}
                  as={`/list/${result.id}`}
                  key={result.id}
              >
                <div
                    className={styles.card}
                    onClick={() => {
                      const container = document.querySelector('.searchContainer');
                      if (container) {
                        container.innerHTML = '';
                      }
                    }}
                >
                  <h3>{result.name}</h3>
                </div>
              </Link>
          ))}
        </div>
      </div>
  );
};

export default PlayBookFolders;
