import React from 'react';

import { Header, TodoPanel, TodoList } from './components';

import styles from "./App.module.css";
import { TodoProvider, useTodo } from 'utils';
import { Popup, Button } from 'components';

export const App = () => {
  const [popup, setPopup] = React.useState<boolean>(false)

  const onOpen = () => setPopup((prev) => !prev)

  const appStyles = {
    opacity: "20%",
  }

  return (
    <TodoProvider>
      <div style={popup ? appStyles : {}} className={styles.app_container}>
        <div className={styles.container}>
          <Header />
          <Button color='orange' onClick={onOpen}>add</Button>
          {/* <TodoPanel mode='add' /> */}
          <TodoList />
          {popup && <Popup onOpen={onOpen} mode='add' />}
        </div>
      </div>
    </TodoProvider>
  );
};
