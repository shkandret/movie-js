import { Pagination } from 'antd';
import { Component } from 'react';

export default class MyPagination extends Component {
  handleChange = (page) => {
    if (this.props.pageTab === 'search') {
      this.props.searchPageMovie(this.props.queryMovie, page);
    }
    if (this.props.pageTab === 'rated') {
      console.log(page);
      this.props.getPageSession(page);
    }
  };
  render() {
    const { totalPage, page } = this.props;
    return (
      <div className="box-pag">
        <Pagination
          className="pagination"
          defaultCurrent={page}
          pageSize={1}
          total={totalPage}
          showSizeChanger={false}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
