import { useContext, useState, KeyboardEvent } from 'react';
import { Footer } from '../../components/Footer/Footer';
import {
  Parallax,
  UpFirstContent,
  DownFirstContent,
  DownGridContainer,
  FirstParallax,
  SecondParallax,
  SecondParallaxSubTitle
} from './style';
import { Button } from '../../components/Button/ApolloButton';
import p1 from '../../images/parallax1.png';
import p2 from '../../images/parallax2.png';

import { Link, useNavigate } from 'react-router-dom';
import { TextInputLaranja } from '../../components/TextInputLaranja/TextInputLaranja';
import { NotificationContext } from '../../components/NotificationProvider/NotificationProvider';
import { useTitle } from '../../hooks/useTitle';

interface ISearch {
  city: string;
  query: string;
}
const Home = () => {
  useTitle('Home');
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState<ISearch>({
    city: '',
    query: ''
  });
  const handleChange = (e: any) => {
    setSearch((curr) => ({
      ...curr,
      [e.target.name]: e.target.value
    }));
  };

  const searchProfessional = () => {
    if (!search.city || search.city.length === 0) {
      showNotification('Por favor selecione uma cidade', 'warning');
      return;
    }

    navigate(`/buscar?city=${search.city}&query=${search.query}`, { replace: true });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;

    searchProfessional();
  };

  return (
    <>
      <div id="main">
        <Parallax url={p1}>
          <FirstParallax>
            <UpFirstContent>Busque um estilo com os nossos profissionais</UpFirstContent>
            <DownFirstContent>
              <DownGridContainer>
                <TextInputLaranja
                  label=""
                  placeholder="Cidade"
                  name="city"
                  data-cy="queryCityInput"
                  value={search?.city || ''}
                  onChange={handleChange}
                  onKeyDown={onKeyDown}
                />
                <TextInputLaranja
                  label=""
                  placeholder="Busque um profissional"
                  name="query"
                  data-cy="queryProfessionalInput"
                  value={search?.query || ''}
                  onChange={handleChange}
                  onKeyDown={onKeyDown}
                />
                <Button
                  variant="contained"
                  onClick={() => searchProfessional()}
                  data-cy="searchProfessionalButton"
                >
                  <span>Buscar</span>
                </Button>
              </DownGridContainer>
            </DownFirstContent>
          </FirstParallax>
        </Parallax>
        <Parallax url={p2}>
          <SecondParallax>
            <SecondParallaxSubTitle>Encontre barbearias próximas à você</SecondParallaxSubTitle>
            <Button
              component={Link}
              to="/profissional/login"
              variant="contained"
              data-cy="professionalLoginButton"
            >
              Sou profissional
            </Button>
          </SecondParallax>
        </Parallax>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
