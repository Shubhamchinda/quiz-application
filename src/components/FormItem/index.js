import React, { PureComponent } from 'react'
import {
  Form,
  Icon,
  Input,
  Radio,
  DatePicker,
  Select,
  TimePicker,
  InputNumber,
  Button
} from 'antd'
import _ from 'lodash'
import styles from './styles.less'
const { Option } = Select
const { TextArea } = Input

export default class FormItem extends PureComponent {
  componentDidMount() {
  }
  InputType = () => {
    const {
      inputType,
      getFieldDecorator,
      name,
      validateRule,
      type,
      placeholder,
      label,
      onChange,
      defaultValue,
      onRadioChange,
      radioOptions,
      format,
      minuteStep,
      loadOpt,
      mode,
      disabled,
      options,
      tokenSeparators,
      htmlType,
      title,
      loading,
      layout,
      value,
      readonly,
      onClick,
      validator
    } = this.props
    switch (inputType) {
      case 'RADIO':
        return this.props.getFieldDecorator(name, {...validateRule, initialValue: defaultValue})(
          <Radio.Group
            // defaultValue={defaultValue && defaultValue}
            // value={value}
            name={name}
            readOnly={readonly && readonly}
            onChange={onRadioChange}>
            {radioOptions.map(opt => (
              <Radio.Button value={opt.toLowerCase()} key={opt.toLowerCase()} >{opt}</Radio.Button>
            ))}
          </Radio.Group>
        )
      case 'DATE':
        return getFieldDecorator(name, {rules: (validateRule && validator)? [...validateRule.rules,{ validator }]:validateRule && [...validateRule.rules], initialValue: defaultValue})(<DatePicker format='DD/MM/YYYY' />)
      case 'TIME':
        return getFieldDecorator(name, {...validateRule, initialValue: defaultValue})(
          <TimePicker
            format={format && format}
            minuteStep={minuteStep && minuteStep}
            readOnly={readonly && readonly}
          />
        )
      case 'SELECT':
        return loadOpt ? (
          getFieldDecorator(name, {...validateRule,initialValue: defaultValue})(
            <Select
              placeholder={placeholder || label}
              onChange={onChange && onChange}
              readOnly={readonly && readonly}
              disabled={disabled && disabled}
              style={{ width: this.props.width ? this.props.width : '100%' }}
              mode={mode && mode}
              className={layout? styles.layout: null}
              tokenSeparators={tokenSeparators && tokenSeparators}>
              {options && options}
            </Select>
          )
        ) : (
          getFieldDecorator(name, {...validateRule,initialValue: defaultValue})(
            <Select
              placeholder={placeholder || label}
              onChange={onChange && onChange}
              readOnly={readonly && readonly}
              disabled={disabled && disabled}
              style={{ width: this.props.width ? this.props.width : '100%' }}
              mode={mode && mode}
              tokenSeparators={tokenSeparators && tokenSeparators}>
              {options &&
                options.map(opt => {
                  return (
                    <Option value={opt} key={opt}>
                      {opt}
                    </Option>
                  )
                })}
            </Select>
          )
        )
      case 'TEXTAREA':
        return getFieldDecorator(name, validateRule)(
          <TextArea
            className={name}
            prefix={
              <Icon type={type && type} style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder={placeholder || name}
            onChange={onChange && onChange}
            readOnly={readonly && readonly}
          />
        )
      case 'NUMBER':
        return getFieldDecorator(name, {rules: (validateRule && validator)? [...validateRule.rules,{ validator }]:validateRule && [...validateRule.rules], initialValue: defaultValue})(
          <InputNumber
            onChange={onChange}
            readOnly={readonly && readonly}
            style={{ width: this.props.width ? this.props.width : '' }}
            />
        )

      case 'BUTTON':
        return (
          <Button
            type={type && type}
            htmlType={htmlType && htmlType}
            loading={loading && loading}
            onClick={onClick}>
            {title}
          </Button>
        )
      default:
        return getFieldDecorator(name, {rules : validateRule && [...validateRule.rules,{type ,message: 'The input is not valid E-mail!'}], initialValue: defaultValue })(
          <Input
            className={name}
            placeholder={placeholder || _.startCase(name) || label}
            readOnly={readonly && readonly}
            onChange={onChange}
          />
        )
    }
  }

  render() {
    let {
      label,
      name,
      getFieldDecorator,
      validateRule,
      layout,
      formItemLayout
    } = this.props

    if (!formItemLayout && !layout) {
      formItemLayout = {
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
    }

    if (!label) {
      label = _.startCase(name)
    }

    return (
      <>
        <Form.Item
          label={label && label}
          {...formItemLayout}
          className={styles.FormItem}>
          {this.InputType()}
        </Form.Item>
      </>
    )
  }
}
