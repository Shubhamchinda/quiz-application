import React, { Component } from 'react'
import { Table, Card, Button, Icon, InputNumber, Tag, Spin } from 'antd'
import _ from 'lodash'

// import styles from './styles.less'
import { notification } from 'antd/lib/index'
import ReactHtmlParser from 'react-html-parser'

class AddQuestionTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newQuesData: this.props.dataSource && this.props.dataSource,
      marksArr: [],
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { dataSource } = props
    let temp = []
    _.forEach(dataSource && dataSource.length > 0 && dataSource, (value, i) => {
      if (value.marks) {
        temp.push(i)
      }
    })
    return {
      marksArr: temp,
      loading : false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataSource != this.props.dataSource) {
      this.setState({
        newQuesData: this.props.dataSource && this.props.dataSource
      })
    }
  }

  getWrapperWidth() {
    if (this.wrapper) {
      console.log(
        'get wrapper width',
        window.getComputedStyle(this.wrapper).getPropertyValue('width')
      )
    } else {
      console.log('get wrapper - no wrapper')
    }
  }
  onRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows, selectedRowKeys }, () => {
      const { selectedRows } = this.state
      if (selectedRows.length) {
        this.props.selected(true)
      } else {
        this.props.selected(false)
      }
    })
  }

  removeFromTest = data => {
    return this.props.removeFromTest ? this.props.removeFromTest(data) : null
  }

  remove = data => {
    return this.props.remove ? this.props.remove(data) : null
  }

  row = data => {
    this.setState(
      {
        selectedRows: data.selectedRows
      },
      () => {
        const { selectedRows } = this.state
        if (selectedRows.length) {
          this.props.selected(true)
        } else {
          this.props.selected(false)
        }
      }
    )
  }

  render() {
    const columns = [
      {
        title: 'Marks',
        dataIndex: 'marks',
        key: 'marks',
        render: (marks, record, key) => {
          return (
            <div>
              <InputNumber
                tabIndex={key + 1}
                style={{ width: 60 }}
                className={'marks'}
                defaultValue={marks}
                onChange={(val, marks) => {
                  const { dataSource } = this.props
                  const { newQuesData, marksArr } = this.state
                  let temp = newQuesData ? newQuesData : []
                  if (dataSource && dataSource.length) {
                    temp = [...dataSource]
                  }
                  _.each(temp, value => {
                    if (value._id === record._id) {
                      value.marks = val
                    }
                  })
                  let temp1 = marksArr ? [...marksArr] : []
                  if (val) {
                    if (!temp1.includes(key)) {
                      temp1.push(key)
                    }
                  } else {
                    const i = temp1.indexOf(key)
                    temp1.splice(i, 1)
                  }
                  this.setState({
                    newQuesData: temp,
                    marksArr: temp1
                  })
                }}
              />
            </div>
          )
        }
      },
      {
        title: 'Question',
        key: 'question',
        dataIndex: 'questionBody',
        searchTextName: 'question',
        render: questionBody => {
          return <div>{ReactHtmlParser(questionBody)}</div>
        }
      },
    // {
    //     title: 'Mcq Type',
    //     dataIndex: 'questionType',
    //     key: 'questionType'
    //   },
    ]

    const {
      loading,
      selectedRows,
      selectedRowKeys,
      newQuesData,
      marksArr
    } = this.state
    const {
      removeButton,
      dataSource,
      remove,
      submit,
      submitWithMarks,
      selected
    } = this.props
    if (removeButton) {
      remove && remove(selectedRows)
      this.setState(
        {
          selectedRows: [],
          selectedRowKeys: []
        },
        () => {
          selected(false)
        }
      )
    }

    if (submit && submit) {
      let flag = true
      _.forEach(newQuesData, (val, i) => {
        if (marksArr && !marksArr.includes(i)) {
          flag = false
          return false
        }
      })
      if (!flag) {
        notification.error({
          message: 'Please Enter Marks'
        })
      } else {
        submitWithMarks(newQuesData)
      }
    }

    const rowSelection = {
      selectedRowKeys,
      selectedRows,
      onChange: this.onRowSelectChange
    }

    return (
      <Card bordered={true} title="Questions in Quiz">
        {loading ? <Spin /> : <Table
          columns={columns}
          dataSource={newQuesData}
          rowKey={row => row._id}
          rowSelection={rowSelection}
          pagination={false}
        />}
      </Card>
    )
  }
}


export default (AddQuestionTable)
