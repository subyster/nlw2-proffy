import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [clearFilters, setClearFilters] = useState(false);

  async function loadTeachers(): Promise<void> {
    api.get('classes').then(response => {
      setTeachers(response.data);
    });
  }
  useEffect(() => {
    loadTeachers();
  }, []);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('search_classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setClearFilters(true);

    setTeachers(response.data);
  }

  function handleClearFilters() {
    setClearFilters(false);

    loadTeachers();
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={(e) => { setSubject(e.target.value) }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Gramática', label: 'Gramática' },
              { value: 'História', label: 'História' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Literatura', label: 'Literatura' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Química', label: 'Química' },
              { value: 'Sociologia', label: 'Sociologia' },
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da Semana"
            value={week_day}
            onChange={(e) => { setWeekDay(e.target.value) }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input 
            type="time"
            name="time"
            label="Hora"          
            value={time}
            onChange={(e) => { setTime(e.target.value) }}
          />

          <button type="submit">Buscar</button>
        </form>

        { clearFilters && (
        <button id="clear-filters" onClick={handleClearFilters} type="button">
          Limpar filtros
        </button>)}
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher}/>
        })}
      </main>
    </div>  
  );
}

export default TeacherList;