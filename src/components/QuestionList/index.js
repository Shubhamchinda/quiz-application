import React, { Component } from "react";
import { Table, Card, Button, Icon, Input, Tag } from "antd";
import Highlighter from "react-highlight-words";

import Request from "../../request";
import _ from "lodash";
import styles from "./styles.less";
import ReactHtmlParser from "react-html-parser";

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      search: false
    };
  }

  componentDidMount() {
    this.apiRequest();
  }

  apiRequest = async params => {
    const quesData = await Request.getQuestions();
    this.setState({
      data: quesData && quesData.data
    });
  };

  add = data => {
    return this.props.addToTest ? this.props.addToTest(data) : null;
  };

  getWrapperWidth() {
    if (this.wrapper) {
      console.log(
        "get wrapper width",
        window.getComputedStyle(this.wrapper).getPropertyValue("width")
      );
    } else {
      console.log("get wrapper - no wrapper");
    }
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows, selectedRowKeys }, () => {
      const { selectedRows } = this.state;
      if (selectedRows.length) {
        this.props.selected(true);
      } else {
        this.props.selected(false);
      }
    });
  };
  // handleAddButton = () => {
  //  let x = this.props.add ? this.props.add(this.state.selectedRows) : null
  //  this.setState({
  //    selectedRows:[],
  //    selectedRowKeys:[]
  //  })
  // }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleInputSearch = e => {
    const val = e.target.value;
    this.setState({
      val: val
    });

    let temp = [];
    _.each(this.state.data, value => {
      value.topics.findIndex(vall => {
        if (vall === val) temp.push(value);
      });
    });
    this.setState({
      data2: temp,
      search: true
    });
  };
  handleInputReset = () => {
    this.setState({
      search: false,
      data2: [],
      val: ""
    });
  };
  handleInputAdd = () => {
    const { add } = this.props;
    const { data2 } = this.state;
    add(data2);
  };

  render() {
    const { loading, selectedRows, selectedRowKeys, data2 } = this.state;
    const { addButton, selected } = this.props;
    if (addButton) {
      this.props.add && this.props.add(this.state.selectedRows);
      this.setState(
        {
          selectedRows: [],
          selectedRowKeys: []
        },
        () => {
          selected(false);
        }
      );
    }

    const rowSelection = {
      selectedRowKeys,
      selectedRows,
      onChange: this.onSelectChange
    };
    const columns = [
      {
        title: "Question",
        key: "question",
        dataIndex: "questionBody",
        searchTextName: "question",
        render: questionBody => {
          return <div>{ReactHtmlParser(questionBody)}</div>;
        }
      }
      // {
      //   title: 'Mcq Type',
      //   dataIndex: 'questionType',
      //   key: 'questionType'
      // },
    ];
    const { data, search } = this.state;
    return (
      <Card bordered={true} title="All Questions">
        {/* <div style={{ display: "flex" }}>
          <Input
            className={styles.TopicsInput}
            onChange={this.handleInputSearch}
            placeholder="Search by topics"
            value={this.state.val}
          />
          <Button className={styles.Reset} onClick={this.handleInputAdd}>
            <Icon type="arrow-right" />
          </Button>
          <Button className={styles.Reset} onClick={this.handleInputReset}>
            Reset
          </Button>
        </div> */}
        <Table
          columns={columns}
          dataSource={search ? data2 : data}
          rowKey={row => row._id}
          rowSelection={rowSelection}
          pagination={false}
        />
      </Card>
    );
  }
}

export default QuestionList;
