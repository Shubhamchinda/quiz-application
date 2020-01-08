import React, { PureComponent } from "react";
// import PageHeaderWrapper from "../../../components/PageHeaderWrapper";
import { Form, Select, Card, Button, Spin, notification } from "antd";
import _ from "lodash";
import Async from "async";
// import { notification } from "antd/lib/index";
import Request from "../../../request";
import { stateFromHTML } from "draft-js-import-html";

import FormItem from "../../../components/FormItem";
import Draft from "../../../components/draft";
import styles from "./styles.less";
import QuestionList from "../../../components/QuestionList";
import AddQuestionTable from "../../../components/QuestionList/addedQuestion";

const { Option } = Select;

@Form.create()
class AddQuesToTest extends PureComponent {
  state = {
    loading: false,
    newQuesData: [],
    addButton: false,
    edit: false,
    data: [],
    marksTotal: 0
  };

  submitWithMarks = data => {
    this.setState({
      newQuesData: data,
      submitMarks: true
    });
  };

  onInstructionChange = data => {
    this.setState(
      {
        instructions: data
      },
      () => {
        // console.log('instructionChange', this.state)
      }
    );
  };

  handleSubmit = async e => {
    const { form } = this.props;
    this.setState(
      {
        submitButton: true
      },
      () => {
        setTimeout(async () => {
          e.persist();
          if (this.state.submitMarks) {
            let body = {};
            form.validateFieldsAndScroll(async (err, valData) => {
              valData.isOnline = this.state.isOnline;
              console.log(valData, "VALLLLS");
              body = { ...valData };
            });
            const { newQuesData } = this.state;
            newQuesData.map((item, key) => {
              newQuesData[key].qid = item.qid;
            });
            body = {
              ...body,
              questions: newQuesData,
              description: this.state.instructions
            };
            // console.log(newQuesData)
            // let totalMarks = 0
            // Async.forEach(newQuesData, (val)=>{
            //   totalMarks = totalMarks + val.marks
            // })
            // this.setState({
            //   marksTotal : totalMarks
            // })
            const x = await Request.addQuiz(body);
            console.log(body, x, "BODY");
            if (!x.error) {
              notification.success({
                message: x.message
              });
            } else {
              notification.error({
                message: "Error Saving",
                description: x.message
              });
            }
          }
          this.setState({
            submitButton: false
          });
        }, 1000);
      }
    );
  };

  addSingleToTest = data => {
    const { newQuesData } = this.state;

    let t = newQuesData ? newQuesData : [];
    if (newQuesData && newQuesData.length) {
      t = [...newQuesData];
    }

    let temp = [...t];
    let flag = false;
    _.each(temp, ques => {
      if (ques.qid === data._id || ques._id === data._id) {
        flag = true;
      }
    });
    if (!flag) {
      temp.push(data);
    }
    this.setState({
      newQuesData: [...temp]
    });
  };

  removeSingleFromTest = data => {
    let t;
    if (this.state.newQuesData && this.state.newQuesData.length) {
      t = [...this.state.newQuesData];
    }

    let temp = [...t];

    let index = temp.indexOf(data);
    if (temp.includes(data)) {
      temp.splice(index, 1);
    }

    this.setState({
      newQuesData: [...temp]
    });
  };
  addMultiple = data => {
    const { newQuesData } = this.state;

    let t = newQuesData ? newQuesData : [];
    if (newQuesData && newQuesData.length) {
      t = [...newQuesData];
    }

    let temp = [...t];

    if (data && data.length) {
      _.each(data, ques => {
        let flag = false;
        _.each(temp, val => {
          if (val.qid === ques._id || val._id === ques._id) {
            flag = true;
          }
        });
        if (!flag) {
          temp.push(ques);
        }
      });
    }
    this.setState({
      newQuesData: [...temp],
      addButton: false
    });
  };
  removeMultiple = data => {
    const { newQuesData } = this.state;

    let t = newQuesData ? newQuesData : [];
    if (newQuesData && newQuesData.length) {
      t = [...newQuesData];
    }

    let temp = [...t];

    _.each(data, ques => {
      let index = temp.indexOf(ques);
      if (temp.includes(ques)) {
        temp.splice(index, 1);
      }
    });

    this.setState({
      newQuesData: [...temp],
      removeButton: false
    });
  };

  handleAddButton = () => {
    this.setState({
      addButton: true
    });
  };

  render() {
    const {
      description,
      loading,
      newQuesData,
      submitButton,
      removeButton,
      selected,
      rSelected,
      marksTotal,
      quesArray
    } = this.state;
    const {
      form: { getFieldDecorator, getFieldValue }
    } = this.props;

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
    };

    const validateRule = {
      rules: [{ required: true, message: "Required field" }]
    };

    const fIAll = {
      getFieldDecorator,
      validateRule
    };
    const { addButton } = this.state;
    let comp = <p>Loading...</p>;
    if (!loading) {
      comp = (
        <>
          <Card bordered={true} loading={loading}>
            <Form
              onSubmit={this.handleSubmit}
              style={{ marginTop: 8 }}
              hideRequiredMark
            >
              <div className={styles.Main}>
                <Card className={styles.CardForm}>
                  <FormItem {...fIAll} label={"Name"} name={"testName"} />

                  <FormItem {...fIAll} label={"Duration"} name={"duration"} />
                  <FormItem
                    {...fIAll}
                    inputType={"NUMBER"}
                    label={"Passing Marks"}
                    name={"passingMarks"}
                  />
                  <FormItem
                    {...fIAll}
                    inputType={"NUMBER"}
                    label={"Total Marks"}
                    name={"totalMarks"}
                    value={marksTotal}
                  />
                </Card>
                <Card title={"Quiz Descriptions :"} className={styles.CardForm}>
                  <Draft
                    text={description}
                    onChange={data => {
                      this.onInstructionChange(data);
                    }}
                  />
                </Card>
              </div>
            </Form>
            <div className={styles.Table}>
              <div className={styles.QuesTable}>
                <Button
                  type="primary"
                  className={styles.AddRem}
                  disabled={!selected}
                  onClick={this.handleAddButton}
                >
                  Add to test
                </Button>
                <QuestionList
                  addToTest={data => this.addSingleToTest(data)}
                  add={data => this.addMultiple(data)}
                  addButton={addButton}
                  selected={sel => {
                    this.setState({ selected: sel });
                  }}
                />
              </div>
              <div className={styles.QuesTable}>
                <Button
                  type="primary"
                  className={styles.AddRem}
                  disabled={!rSelected}
                  onClick={() => {
                    this.setState({ removeButton: true });
                  }}
                >
                  Remove from test
                </Button>
                <AddQuestionTable
                  dataSource={newQuesData}
                  removeFromTest={data => this.removeSingleFromTest(data)}
                  remove={data => this.removeMultiple(data)}
                  removeButton={removeButton}
                  submitWithMarks={data => this.submitWithMarks(data)}
                  submit={submitButton}
                  selected={sel => {
                    this.setState({ rSelected: sel });
                  }}
                />
              </div>
            </div>
          </Card>
          <FormItem
            inputType={"BUTTON"}
            title={"Add Test"}
            type={"primary"}
            onClick={this.handleSubmit}
            loading={submitButton}
            disabled={newQuesData.length === 0}
          />
        </>
      );
    }
    return (
      <>
        <div className={styles.type}>
          <p>{`Create Quiz`} </p>
        </div>
        {comp}
      </>
    );
  }
}

export default AddQuesToTest;
