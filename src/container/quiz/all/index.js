import React, { Component } from 'react'
import Highlighter from 'react-highlight-words'
import { withRouter } from "react-router-dom";

import {
  Icon,
  Drawer,
  Button,
  Input,
  Table,
  Tag,
  Card,
  Menu,
} from 'antd'
import _ from 'lodash'
import { notification } from 'antd'

import Request from '../../../request'
import styles from './styles.less'

class AllTest extends Component {
  state = {
    loading: false,
    tableLoading: false,
    data: [],
    pagination: {},
    searchText: '',
    loadingQ: false
  }

  componentDidMount() {
    this.apiRequest()
  }
//   undo = async ids => {
//     this.setState({ loading: true })
//     let data = await Request.restoreTest(ids)
//     this.setState(
//       {
//         loading: false
//       },
//       () => {
//         notification.destroy()
//         this.apiRequest()
//       }
//     )
//   }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager
    })
    this.apiRequest({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
  }
  apiRequest = async (params = {}) => {
    this.setState({ tableLoading: true })
    // let apiData = JSON.parse(currentUser)
    let data = await Request.getAllQuiz()
    console.log(data)
    const pagination = { ...this.state.pagination }
    pagination.total = (data && data.data && data.data.length) || 0
    this.setState({
      loading: false,
      data: data.data,
      pagination,
      tableLoading: false
    })
  }

  // menu = id => (
  //   <Menu onClick={item => this.menuChange(item, id)}>
  //     <Menu.Item key="user">
  //       <div>Add User</div>
  //     </Menu.Item>
  //   </Menu>
  // )
  // menuChange = (item, _id) => {
  //   this.setState({
  //     visible: true,
  //     item: { ...item, _id }
  //   })
  // }
  getColumnSearchProps = (dataIndex, index) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          className={`search-value-${dataIndex}`}
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          className={`search-${dataIndex}`}
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}>
          Search
        </Button>
        <Button
          className={`reset-${dataIndex}`}
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon
        className={`filter-menu-${dataIndex}`}
        type="search"
        style={{ color: filtered ? '#1890ff' : undefined }}
      />
    ),
    onFilter: (value, record) => {
      return index
        ? record[dataIndex][index]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }
  startTest = record => {
    this.props.history.push(`quiz/${record._id}`)
  }
  render() {
    const columns = [
      {
        title: 'Name',
        key: 'testName',
        dataIndex: 'testName',
        ...this.getColumnSearchProps('testName')
      },
      {
        title: 'Duration',
        key: 'duration',
        dataIndex: 'duration'
      },
      {
        title: 'Passing Marks',
        key: 'passingMarks',
        dataIndex: 'passingMarks'
      },
      {
        title: 'Total Marks',
        key: 'totalMarks',
        dataIndex: 'totalMarks'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (val, record, key) => {
          return (
            <>
              <Button onClick={() => this.startTest(record)}>Start Test</Button>
            </>
          )
        }
      }
    ]
    const { tableLoading, loading, item } = this.state
    // const condition = (key, _id) => {
    //   return key == 'user' ? (
    //     <Adduser _id={this.props.currentUser.instituteId} branchId={_id} />
    //   ) : (
    //     false
    //   )
    // }
    return (
      <>
      <div className={styles.type}>
          <p>{`All Quizzes`} </p>
        </div>
        <Card bordered={true}>
          <Table
            bordered
            columns={columns}
            rowKey={record => record._id}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={tableLoading}
            onChange={this.handleTableChange}
          />
        </Card>
      </>
    )
  }
}


export default withRouter(AllTest)
