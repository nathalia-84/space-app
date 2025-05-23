import { styled } from "styled-components";
import EstilosGlobais from "./componentes/EstilosGlobais";
import Cabecalho from "./componentes/Cabecalho";
import BarraLateral from "./componentes/BarraLateral";
import Banner from "./componentes/Banner";
import bannerBackground from "./assets/banner.png";
import Galeria from "./componentes/Galeria";

import fotos from "./fotos.json";
import tagsJson from "./tags.json";
import { useEffect, useState } from "react";
import ModalZoom from "./componentes/ModalZoom";

const FundoGradiente = styled.div`
  background: linear-gradient(
    174.61deg,
    #041833 4.16%,
    #04244f 48%,
    #154580 96.76%
  );
  width: 100%;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`;

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`;

const ConteudoGaleria = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const App = () => {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos);
  const [fotoZoom, setFotoZoom] = useState(null);
  const [tags, setTags] = useState(tagsJson);
  const [filtro, setfiltro] = useState("");

  useEffect(() => {
    if (filtro) {
      const fotosFiltradas = fotos.filter((foto) =>
        foto.titulo.toLowerCase().includes(filtro.toLowerCase())
      );
      setFotosDaGaleria(fotosFiltradas);
    } else {
      setFotosDaGaleria(fotos);
    }
  }, [filtro]);

  const aoFiltrarFotos = (filtro) => {
    setfiltro(filtro);
  };

  const aoFavoritarFoto = (foto) => {
    if (foto.id === fotoZoom?.id) {
      setFotoZoom({
        ...fotoZoom,
        favorita: !fotoZoom.favorita,
      });
    }
    setFotosDaGaleria(
      fotosDaGaleria.map((fotoDaGaleria) => {
        return {
          ...fotoDaGaleria,
          favorita:
            fotoDaGaleria.id === foto.id
              ? !foto.favorita
              : fotoDaGaleria.favorita,
        };
      })
    );
  };

  const aoSelecionarTag = (id) => {
    const tagsAtualizadas = tags.map((tag) => ({
      ...tag,
      ativa: tag.id === id,
    }));
    setTags(tagsAtualizadas);

    if (id === 0) {
      setFotosDaGaleria(fotos);
    } else {
      const fotosFiltradas = fotos.filter((foto) => foto.tagId === id);
      setFotosDaGaleria(fotosFiltradas);
    }
  };

  return (
    <FundoGradiente>
      <EstilosGlobais />
      <AppContainer>
        <Cabecalho aoFiltrarFotos={aoFiltrarFotos} />
        <MainContainer>
          <BarraLateral />
          <ConteudoGaleria>
            <Banner
              texto="A galeria mais completa de fotos do espaço!"
              backgroundImage={bannerBackground}
            />
            <Galeria
              fotos={fotosDaGaleria}
              aoDarZoom={(foto) => setFotoZoom(foto)}
              aoFavoritarFoto={aoFavoritarFoto}
              tags={tags}
              aoSelecionarTag={aoSelecionarTag}
            />
          </ConteudoGaleria>
        </MainContainer>
        <ModalZoom
          foto={fotoZoom}
          aoFechar={() => setFotoZoom(null)}
          aoFavoritarFoto={aoFavoritarFoto}
        />
      </AppContainer>
    </FundoGradiente>
  );
};

export default App;
