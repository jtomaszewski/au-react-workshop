import React from 'react';
import { Message } from './ChatAPI';
import './MessageBox.css';
import { MessagesListThread } from './MessagesListThread';
import { Button } from './ui/Button';

export interface MessageBox {
  message: string;
  disabled?: boolean;
  replyTo?: Message;
  onReplyClear?(): void;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function handleChange(
  event: React.ChangeEvent<HTMLTextAreaElement>,
  onChange: MessageBox['onChange']
) {
  if (onChange) {
    onChange(event.target.value);
  }
}

function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  onSubmit: MessageBox['onSubmit']
) {
  event.preventDefault();
  if (onSubmit) {
    onSubmit();
  }
}

export function MessageBox(props: MessageBox) {
  const {
    onChange,
    onSubmit,
    message,
    disabled,
    replyTo,
    onReplyClear
  } = props;

  return (
    <form
      onSubmit={event => handleSubmit(event, onSubmit)}
      className="MessageBox"
    >
      {replyTo && (
        <div>
          Odpowiadasz na{' '}
          <Button type="button" onClick={onReplyClear}>
            (anuluj)
          </Button>
          <div
            style={{
              background: '#fff',
              margin: '5px 0',
              padding: '5px'
            }}
          >
            <MessagesListThread message={replyTo} showSubmessages={false} />
          </div>
        </div>
      )}

      <textarea
        value={message}
        onChange={event => handleChange(event, onChange)}
        className="MessageBox__textarea"
        disabled={disabled}
      />

      <Button type="submit" disabled={disabled}>
        Wyślij
      </Button>
    </form>
  );
}
