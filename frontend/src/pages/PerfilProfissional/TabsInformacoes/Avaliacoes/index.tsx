import { FilterList, Star } from '@mui/icons-material';
import { List, Typography, Divider, Rating, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../../../components/NotificationProvider/NotificationProvider';
import { TextAreaLaranja } from '../../../../components/TextInputLaranja/TextAreaLaranja';
import { useUser } from '../../../../hooks/useUser';
import api from '../../../../services/api';
import IReview from '../../../../types/IReview';
import { Avaliacao } from './Avaliacao';

interface AvaliacoesProps {
  profissionalId: string | undefined;
}
export const Avaliacoes: React.FC<AvaliacoesProps> = ({ profissionalId }) => {
  const [avaliacoes, setAvaliacoes] = useState<IReview[] | undefined>(undefined);
  const { showNotification } = useContext(NotificationContext);
  const [filtroAvaliacao, setFiltroAvaliacao] = useState<number | null>(null);
  const [reviewRating, setReviewRating] = useState<number | null>(null);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [atualizarAvaliacoes, setAtualizarAvaliacoes] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const user: any = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (profissionalId !== undefined) {
      const params = {
        professionalId: profissionalId
      } as any;
      if (filtroAvaliacao) params.rating = filtroAvaliacao;
      api
        .get(`reviews`, { params })
        .then((res) => {
          if (res.status === 200) {
            setAvaliacoes(res.data);
          }
        })
        .catch((err) => {
          showNotification(err, 'error');
        });
    }
  }, [profissionalId, filtroAvaliacao, atualizarAvaliacoes]);

  const validarReview = (): boolean => {
    if (!user) {
      showNotification('Por favor faça login para realizar esta ação', 'error');
      navigate('/login');
      return false;
    }
    if (user.type !== 'CUSTOMER') {
      showNotification('Somente clientes podem realizar esta ação', 'warning');
      return false;
    }
    if (!profissionalId) return false;
    if (reviewRating === null) {
      showNotification('Por favor selecione a avaliação', 'warning');
      return false;
    }

    return true;
  };

  const createReview = () => {
    if (!validarReview()) return;

    const reqBody = {
      professionalId: Number.parseInt(profissionalId!),
      rating: reviewRating,
      comment: reviewComment === '' ? undefined : reviewComment
    };

    api
      .post('/reviews', reqBody)
      .then((_) => {
        setAtualizarAvaliacoes(!atualizarAvaliacoes);
        showNotification('Avaliação criada com sucesso', 'success');
        setReviewRating(null);
        setReviewComment('');
      })
      .catch((err) => showNotification(err, 'error'));
  };

  const updateReview = () => {
    if (!validarReview()) return;
    if (!editId) return;

    const reqBody = {
      professionalId: Number.parseInt(profissionalId!),
      rating: reviewRating,
      comment: reviewComment === '' ? undefined : reviewComment
    };

    api
      .put(`/reviews/${editId}`, reqBody)
      .then((_) => {
        setAtualizarAvaliacoes(!atualizarAvaliacoes);
        showNotification('Avaliação atualizada com sucesso', 'success');
        setReviewRating(null);
        setReviewComment('');
        setEditId(null);
      })
      .catch((err) => showNotification(err, 'error'));
  };

  const setEditReview = (id: number, rating: number, comment: string) => {
    setEditId(id);
    setReviewRating(rating);
    setReviewComment(comment ?? '');
  };
  const deleteReview = (id: number) => {
    api
      .delete(`/reviews/${id}`)
      .then((_) => {
        setAtualizarAvaliacoes(!atualizarAvaliacoes);
        showNotification('Avaliação deletada com sucesso', 'info');
      })
      .catch((err) => showNotification(err, 'error'));
  };

  return (
    <>
      {user && user.type === 'CUSTOMER' && (
        <div style={{ marginBottom: '2em' }}>
          <TextAreaLaranja
            name="review-comment"
            label={
              <>
                <span style={{ fontWeight: 'bold' }}>Avalie o profissional:</span>
                <Rating
                  value={reviewRating}
                  icon={<Star color="primary" fontSize="inherit" />}
                  emptyIcon={<Star htmlColor="#FFE3D8" fontSize="inherit" />}
                  onChange={(_, value) => setReviewRating(value)}
                ></Rating>
              </>
            }
            value={reviewComment}
            onChange={(ev: any) => setReviewComment(ev.target.value)}
            placeholder="Comentários"
          />
          <Button
            variant="contained"
            onClick={editId !== null ? updateReview : createReview}
            style={{ minWidth: '200px', marginTop: '1em' }}
          >
            {editId !== null ? 'Editar Avaliação' : 'Avaliar'}
          </Button>
          {editId !== null && (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setEditId(null);
                setReviewRating(null);
                setReviewComment('');
              }}
              style={{ minWidth: '200px', marginTop: '1em', marginLeft: '1em' }}
            >
              Cancelar
            </Button>
          )}
        </div>
      )}
      <div
        style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '0.6em' }}
      >
        <FilterList color="primary" />
        Filtrar Avaliações:
        <Rating
          value={filtroAvaliacao}
          icon={<Star color="primary" fontSize="inherit" />}
          emptyIcon={<Star htmlColor="#FFE3D8" fontSize="inherit" />}
          onChange={(_, value) => setFiltroAvaliacao(value)}
        ></Rating>
        {filtroAvaliacao && (
          <Button
            variant="text"
            color="error"
            style={{ padding: '0 8px' }}
            onClick={() => setFiltroAvaliacao(null)}
          >
            (limpar filtro)
          </Button>
        )}
      </div>
      <Typography>
        {avaliacoes !== undefined &&
          `${avaliacoes?.length}  ${
            avaliacoes?.length === 1 ? 'Avaliação' : 'Avaliações'
          } de clientes `}
      </Typography>
      <List disablePadding sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Divider />
        {avaliacoes?.map((avaliacao, index) => (
          <Avaliacao
            key={index}
            avaliacao={avaliacao}
            userOwnsReview={user && user.type === 'CUSTOMER' && user.id === avaliacao.customerId}
            actions={{ setEditReview, deleteReview }}
          />
        ))}
      </List>
    </>
  );
};
