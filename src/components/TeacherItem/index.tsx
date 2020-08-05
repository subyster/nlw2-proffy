import React from 'react';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
          <header>
            <img src={teacher.avatar} alt={teacher.name}/>
            <div>
              <strong>{teacher.name}</strong>
              <span>{teacher.subject}</span>
            </div>
          </header>

          <p>{teacher.bio}</p>

          <footer>
            <p>
              Preço/hora
              <strong>{formatValue(teacher.cost)}</strong>
            </p>
            <a 
              onClick={createNewConnection} 
              href={`https://wa.me/${teacher.whatsapp}`}
              // eslint-disable-next-line react/jsx-no-target-blank
              target="_blank"
            >
              <img src={whatsappIcon} alt="Whatsapp"/>
              Entrar em contato
            </a>
          </footer>
        </article>
  );
}

export default TeacherItem;