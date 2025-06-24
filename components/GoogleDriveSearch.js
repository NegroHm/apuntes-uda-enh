// import React, { useState , useEffect, useRef} from "react";
// import axios from "axios";
// import config from "../config.json";
// import handleAccessTokenExpiration from "./HandleAccessTokenExpiration";
// import handleGoogleDriveShortcutLink from "./HandleGoogleDriveShortcutLink";
// import styles from '../styles/Home.module.css'

// const SearchGoogleDrive = () => {
//   const [targetFolderId, setTargetFolderId] = useState(config.directory.target_folder);
//   const teamDriveId = config.directory.team_drive;
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const corpora = (teamDriveId) ? "teamDrive" : "allDrives";

//   const handleClickOutside = event => {

//     if (!event.target.className || typeof event.target.className.includes != 'function') {
//       return;
//     }

//     if (
//         !event.target.className.includes(styles.searchContainer)
//         && !event.target.className.includes(styles.searchInput)
//         && !event.target.className.includes(styles.searchResult)
//         && !event.target.className.includes(styles.searchResultLink)
//     ) {
//       setResults([]);
//     }
//   };

//   useEffect(() => {

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);



//   const searchFiles = async () => {
//     setLoading(true);
//     setError(null);
//     setResults([]);

//     const accessToken = localStorage.getItem("access_token");
//     let folderIds = [targetFolderId];

//     try {
//       let res = await axios.get("https://www.googleapis.com/drive/v3/files", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: {
//           source: "GoogleDriveSource",
//           corpora: corpora,
//           includeTeamDriveItems: true,
//           supportsAllDrives: true,
//           teamDriveId: teamDriveId,
//           q: `mimeType='application/vnd.google-apps.folder' and trashed = false and parents in '${targetFolderId}'`
//         }
//       });

//       const subFolders = res.data.files || [];
//       subFolders.forEach(folder => {
//         folderIds.push(folder.id);
//       });

//       res = await axios.get("https://www.googleapis.com/drive/v3/files", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         params: {
//           source: "GoogleDriveSource",
//           corpora: corpora,
//           includeTeamDriveItems: true,
//           supportsAllDrives: true,
//           teamDriveId: teamDriveId,
//           q: `mimeType!='application/vnd.google-apps.folder' and trashed = false and parents in '${folderIds.join("','")}' and (name contains '${query}' or fullText contains '${query}')`
//         }
//       });

//       setResults(res.data.files || []);
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         handleAccessTokenExpiration();
//       } else {
//         setError(err);
//       }
//     }

//     setLoading(false);
//   };

//   const handleKeyPress = event => {
//     if (event.key === 'Enter') {
//       searchFiles();
//     }
//   };

//   return (
      // <div style={{ width: "100%" , textAlign : "left" }}>
      //   <input
      //       type="text"
      //       value={query}
      //       onChange={event => setQuery(event.target.value)}
      //       onKeyPress={handleKeyPress}
      //       className = { styles.searchInput }
      //   />
      //   <button
      //       onClick={searchFiles}
      //       style={{ width: "6vw" , textAlign : "center" , paddingLeft : "12px" , paddingRight : "12px" , paddingTop : "10px" , paddingBottom : "12px" }}
      //   >Search</button>
      //   {loading && <div style={{display:"nonxe"}}>Loading...</div>}
      //   {error && <div>{error.message}</div>}
      //   <ul style={{ width: "100%" , textAlign : "left" }}  className={styles.searchContainer}>
      //     {(results || []).map(result => (
      //         <li key={result.id} className={styles.searchResult}>
      //           <a href={`https://docs.google.com/document/d/${result.id}/edit`} data-file-id={result.id} target="_blank" rel="noopener noreferrer" className={styles.searchResultLink} data-mime-type={result.mimeType} onClick={handleGoogleDriveShortcutLink}>
      //             {result.name}
      //           </a>
      //         </li>
      //     ))}
      //   </ul>
      // </div>

//     );
// };

// export default SearchGoogleDrive;

// ESTE ES EL NUEVO CÓDIGO DE SEARCHGOOGLEDRIVE 

//Arriba esta todo el codigo viejo por si tenes problemas con el nuevo



import React, { useState , useEffect, useRef} from "react";
import axios from "axios";
import config from "../lib/config";
import handleAccessTokenExpiration from "./HandleAccessTokenExpiration";
import handleGoogleDriveShortcutLink from "./HandleGoogleDriveShortcutLink";
import styles from '../styles/Home.module.css'

const SearchGoogleDrive = () => {
  const [targetFolderId, setTargetFolderId] = useState(config.directory.target_folder);
  const teamDriveId = config.directory.team_drive;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const corpora = (teamDriveId) ? "teamDrive" : "allDrives";

  const handleClickOutside = event => {
    if (!event.target.className || typeof event.target.className.includes != 'function') {
      return;
    }

    if (
        !event.target.className.includes(styles.searchContainer)
        && !event.target.className.includes(styles.searchInputNew)
        && !event.target.className.includes(styles.searchResult)
        && !event.target.className.includes(styles.searchResultLink)
        && !event.target.className.includes(styles.searchButton)
    ) {
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchFiles = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    const accessToken = localStorage.getItem("access_token");
    let folderIds = [targetFolderId];

    try {
      let res = await axios.get("https://www.googleapis.com/drive/v3/files", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          source: "GoogleDriveSource",
          corpora: corpora,
          includeTeamDriveItems: true,
          supportsAllDrives: true,
          teamDriveId: teamDriveId,
          q: `mimeType='application/vnd.google-apps.folder' and trashed = false and parents in '${targetFolderId}'`
        }
      });

      const subFolders = res.data.files || [];
      subFolders.forEach(folder => {
        folderIds.push(folder.id);
      });

      res = await axios.get("https://www.googleapis.com/drive/v3/files", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          source: "GoogleDriveSource",
          corpora: corpora,
          includeTeamDriveItems: true,
          supportsAllDrives: true,
          teamDriveId: teamDriveId,
          q: `mimeType!='application/vnd.google-apps.folder' and trashed = false and parents in '${folderIds.join("','")}' and (name contains '${query}' or fullText contains '${query}')`
        }
      });

      setResults(res.data.files || []);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleAccessTokenExpiration();
      } else {
        setError(err);
      }
    }

    setLoading(false);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      searchFiles();
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      {/* Nueva barra de búsqueda */}
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.searchInputNew}
          placeholder="Buscar..."
        />
        <button 
          onClick={searchFiles} 
          className={styles.searchButton}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>

      {loading && <div style={{display:"none"}}>Loading...</div>}
      {error && <div>{error.message}</div>}
      <ul style={{ width: "100%", textAlign: "left" }} className={styles.searchContainer}>
        {(results || []).map(result => (
          <li key={result.id} className={styles.searchResult}>
            <a 
              href={`https://docs.google.com/document/d/${result.id}/edit`} 
              data-file-id={result.id} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.searchResultLink} 
              data-mime-type={result.mimeType} 
              onClick={handleGoogleDriveShortcutLink}
            >
              {result.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchGoogleDrive;