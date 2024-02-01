import React from 'react';
import ReactDOM from 'react-dom';

import { Button } from '../Button';

import styles from './Popup.module.css';
import { useTodo } from 'utils';
import { Todo } from 'models';

const DEFAULT_TODO = { name: '', description: '' };

interface AddTodoPanelProps {
    mode: 'add';
    onOpen: () => void;
}

interface EditTodoPanelProps {
    mode: 'edit';
    editTodo: Omit<Todo, 'id' | 'checked'>;
    onOpen: () => void;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

const portal = document.getElementById("portal")

export const Popup: React.FC<TodoPanelProps> = (props) => {
    const { addTodo, changeTodo } = useTodo()

    const isEdit = props.mode === 'edit';
    const [todo, setTodo] = React.useState(isEdit ? props.editTodo : DEFAULT_TODO);

    const onClick = () => {
        if (isEdit) {
            return changeTodo(todo);
        }
        if (todo.description.length > 0 || todo.name.length > 0) {
            addTodo(todo);
            props.onOpen()
        }
        setTodo(DEFAULT_TODO);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setTodo({ ...todo, [name]: value });
    };

    if (portal) {
        return ReactDOM.createPortal(
            <div className={styles.wrapper}>
                <div className={styles.todo_panel_container}>
                    <div className={styles.fields_container}>
                        <div className={styles.field_container}>
                            <label htmlFor='name'>
                                <div>name</div>
                                <input autoComplete='off' id='name' value={todo.name} onChange={onChange} name='name' />
                            </label>
                        </div>
                        <div className={styles.field_container}>
                            <label htmlFor='description'>
                                <div>description</div>
                                <input
                                    autoComplete='off'
                                    id='description'
                                    value={todo.description}
                                    onChange={onChange}
                                    name='description'
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.button_container}>
                        {!isEdit && (
                            <>
                                <Button disabled={todo.description.length > 0 || todo.name.length > 0} color='blue' onClick={onClick}>
                                    ADD
                                </Button>
                                <Button onClick={props.onOpen} disabled={todo.description.length > 0 || todo.name.length > 0} color='blue' >
                                    CLOSE
                                </Button></>
                        )}
                        {isEdit && (
                            <Button color='orange' onClick={onClick}>
                                EDIT
                            </Button>
                        )}
                    </div>
                </div>
            </div>, portal
        )
    } else return null
};
