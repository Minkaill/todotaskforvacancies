import React from 'react';

import styles from './Header.module.css';
import { useTodo } from 'utils';

interface HeaderProps {
  todoCount: number;
}

export const Header: React.FC = () => {
  const { todos } = useTodo()

  return (
    < div className={styles.header_container} >
      <h1 className={styles.header_title}>
        Todo list <b>{todos.length}</b> task(s)
      </h1>
    </div>
  )
}
