import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";


class Page extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.props.changePage(pageNumber);
  }

  render() {


    return (
      <div className="d-flex justify-content-end " style={{marginRight:"120px"}}>
        <Pagination
         
          activePage={this.props.currentPage}
          itemsCountPerPage={8}
          totalItemsCount={this.props.total}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}
export default Page;
