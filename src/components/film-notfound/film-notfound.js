import { Alert, Space } from 'antd';
import { Component } from 'react';

export default class FilmNotFound extends Component {
  render() {
    console.log('i am heare');
    return (
      <Space
        direction="vertical"
        style={{
          width: '100%',
          padding: '20px',
        }}
      >
        <Alert message="Фильм не найдет" description="попробуй изменить название" type="error" closable showIcon />
      </Space>
    );
  }
}
