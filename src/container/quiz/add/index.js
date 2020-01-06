import React, { PureComponent } from 'react'
import { Form, Select, Button, Card } from 'antd'
import _ from 'lodash'
import { notification } from 'antd/lib/index'
import Request from '../../../request'
import FormItem from '../../../components/FormItem'
import Draft from '../../../components/draft'

const { Option } = Select



@Form.create()
class AddQuiz extends PureComponent {
  state = {
    loading: false,
    btnLoading: false,
    courses: [],
    subjects: [],
    branches: [],
    edit: false,
    instructions: '',
    addQues: false,
    disableSubject: true,
    online: null
  }

  apiRequest = async () => {
    const data = await Request.getCourses({
      instituteId: this.props.currentUser.instituteId
    })
    const data1 = await Request.getBranches({
      instituteId: this.props.currentUser.instituteId
    })
    this.setState(
      {
        courses: data.data,
        branches: data1.data
      },
      () => {
        // console.log('getCourse', this.state)
      }
    )
  }

  extractIdFromName = (find, findingArray) => {
    return new Promise(resolve => {
      console.log('extractIdFromName', find, findingArray)
      if (!find) {
        resolve([])
      }
      let ids = []
      findingArray.map(item => {
        const found =
          find.find(data => {
            return data == item.name
          }) || -1
        if (found != -1) {
          ids.push(item._id)
        }
      })
      resolve(ids)
    })
  }

  handleSubmit = e => {
    const { dispatch, form, currentUser } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      this.setState({ btnLoading: true })
      if (!err) {
        let x = {}
        valData.instituteId = currentUser.instituteId
        // if (!currentUser.branchId) {
        //   notification.error({
        //     message: 'Error Saving',
        //     description: 'This user is not assigned to any branch'
        //   })
        //   return
        // }
        if (valData.isOnline == 'yes') {
          console.log('inside231212121212')
          valData.isOnline = true
        } else if (valData.isOnline == 'no') {
          valData.isOnline = false
        }
        valData.branchId = currentUser.branchId
        valData.extraCourseIds = await this.extractIdFromName(
          valData.extraCourseIds,
          this.state.courses
        )
        valData.branchArray = await this.extractIdFromName(
          valData.branchArray,
          this.state.branches
        )
        valData.subjectId = await this.extractIdFromName(
          valData.subjectId,
          this.state.subjects
        )
        const { data } = await Request.getCurrentSession({
          instituteId: currentUser.instituteId
        })
        // valData.sessionId = data[0]._id
        valData.description = this.state.instructions
        // this.validateMarks()
        if (this.state.pass == true) {
          notification.error({
            message: ' Error saving due to marks'
            // description: x.message
          })
        } else {
          x = await Request.addTest(valData)
          if (!x.error) {
            notification.success({
              message: x.message
            })
            form.resetFields()
            this.setState({
              subjects: [],
              disableSubject: true
            })
            // if (this.state.addQues)
            //   dispatch(getPushPathWrapper('test.addQues', { _id: x.data._id }))
          } else {
            notification.error({
              message: 'Error Saving',
              description: x.message
            })
            console.error(x.err)
          }
        }
        this.setState({ btnLoading: false })
      }
    })
  }
  validateMarks = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    let tot = getFieldValue('totalMarks')
    if (value > tot) {
      callback('Passing marks should be less than total marks')
    }
    callback()
  }

  componentDidMount() {
    this.setState({ disableSubject: true }, () => {})
    // this.apiRequest()
  }
//   onRadioChange = event => {
//     console.log(event.target.value)
//     if (event.target.value == 'yes') {
//       this.setState({
//         online: true
//       })
//     } else if (event.target.value == 'no') {
//       this.setState({ online: false }, () => {
//         console.log(this.state.online)
//       })
//     }
//   }
  render() {
    const { submitting } = this.props
    const {
      form: { getFieldDecorator }
    } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 }
      }
    }
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
        md: { span: 12, offset: 8 }
      }
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    }
    // const courseSelectHandler = data => {
    //   this.state.courses.map(item => {
    //     item._id == data &&
    //       this.setState(
    //         {
    //           subjects: item.subjectArray,
    //           disableSubject: false
    //         }
    //       )
    //   })
    // }
    const onInstructionChange = data => {
      this.setState(
        {
          instructions: data
        }
      )
    }
    const validateRule = {
      rules: [{ required: true, message: 'Required field' }]
    }
    const { loading, addQues } = this.state
    const fIAll = {
      getFieldDecorator,
      validateRule
    }
    // const fIAll1 = {
    //   getFieldDecorator
    // }
    return (
      <>
        <Card loading={loading} bordered={true} id={'add-question'}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem
              {...fIAll}
              inputType={'INPUT'}
              label={'Name'}
              name={'testName'}
            />
            {/* <Form.Item label={'Course'} {...formItemLayout}>
              {getFieldDecorator('courseId', validateRule)(
                <Select
                  placeholder={'Course'}
                  onChange={courseSelectHandler}
                  style={{ width: '100%' }}>
                  {this.state.courses &&
                    this.state.courses.map(opt => {
                      return (
                        <Option value={opt._id} key={opt._id}>
                          {opt.name}
                        </Option>
                      )
                    })}
                </Select>
              )}
            </Form.Item> */}
            {/* <Form.Item label={'Subjects'} {...formItemLayout}>
              {console.log(this.state.disableSubject)}
              {getFieldDecorator('subjectId', validateRule)(
                <Select
                  placeholder={'Subjects'}
                  mode={'multiple'}
                  disabled={this.state.disableSubject}
                  // disabled={true}
                  // defaultValue={defaultValue && defaultValue}
                  style={{ width: '100%' }}>
                  {this.state.subjects &&
                    this.state.subjects.map(opt => {
                      return (
                        <Option value={opt.name} key={opt._id}>
                          {opt.name}
                        </Option>
                      )
                    })}
                </Select>
              )}
            </Form.Item> */}
            {/* <FormItem
              {...fIAll}
              label={'Course'}
              name={'courseId'}
              loadOpt={true}
              onChange={courseSelectHandler}
              inputType={'SELECT'}
              options={
                this.state.courses &&
                this.state.courses.map(opt => {
                  return (
                    <Option value={opt._id} key={opt._id}>
                      {opt.name}
                    </Option>
                  )
                })
              }
            />
            <FormItem
              {...fIAll}
              label={'Subjects'}
              name={'subjectId'}
              mode={'multiple'}
              disabled={this.state.disableSubject}
              loadOpt={true}
              inputType={'SELECT'}
              options={
                this.state.subjects &&
                this.state.subjects.map(opt => {
                  return (
                    <Option value={opt._id} key={opt._id}>
                      {opt.name}
                    </Option>
                  )
                })
              }
            /> */}
            <FormItem
              {...fIAll}
              inputType={'INPUT'}
              label={'Duration'}
              name={'duration'}
            />
            <FormItem
              {...fIAll}
              inputType={'NUMBER'}
              label={'Total Marks'}
              name={'totalMarks'}
            />
            <FormItem
              {...fIAll}
              inputType={'NUMBER'}
              label={'Passing Marks'}
              name={'passingMarks'}
              validator={this.validateMarks}
            />

            {/* <Form.Item label={'Branches'} {...formItemLayout}>
              {getFieldDecorator('branchArray', validateRule)(
                <Select
                  placeholder={'Branches'}
                  mode={'multiple'}
                  style={{ width: '100%' }}>
                  {this.state.branches &&
                    this.state.branches.map(opt => {
                      return (
                        <Option value={opt.name} key={opt._id}>
                          {opt.name}
                        </Option>
                      )
                    })}
                </Select>
              )}
            </Form.Item> */}
            {/* <FormItem
              defaultValue={this.state.online}
              {...fIAll}
              inputType={'RADIO'}
              label={'Online'}
              name={'isOnline'}
              radioOptions={['yes', 'no']}
              onRadioChange={e => {
                this.onRadioChange(e)
              }}
            /> */}
           
            <Card title={'Online Test Descriptions :'} id={'instructions'}>
              <Draft
                text={'Instructions'}
                onChange={data => {
                  onInstructionChange(data)
                }}
              />
            </Card>
            <br />
            <FormItem
              formItemLayout={submitFormLayout}
              // className={'submit'}
              inputType={'BUTTON'}
              type="primary"
              htmlType="submit"
              loading={!addQues && this.state.btnLoading}
              title={'Save Without Question'}
            />
            <Form.Item
              className={'submit'}
              {...submitFormLayout}
              style={{ marginTop: 32 }}>
              <Button
                id={'submit'}
                type="primary"
                htmlType="submit"
                loading={addQues && this.state.btnLoading}
                onClick={() => {
                  this.setState({
                    addQues: true
                  })
                }}>
                Save and Add Questions
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    )
  }
}

const mapStateToProps = ({ global, router }) => ({
  loading: global.buttonLoading,
  categories: global.categories,
  search: router.location.search,
  pathname: router.location.pathname,
  currentUser: global.currentUser
})
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default AddQuiz
