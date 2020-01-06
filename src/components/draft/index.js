import React, { Component } from 'react'

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import { stateToHTML } from 'draft-js-export-html'

import { EditorState, convertToRaw } from 'draft-js'

import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from 'draft-js-buttons'

import styles from './styles.less'

// const FormItem = Form.Item
// const { Option } = Select

/* eslint-disable react/no-multi-comp */

class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick)
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined)

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton]
    return (
      <div>
        {buttons.map((
          Button,
          i // eslint-disable-next-line
        ) => (
          <Button key={i} {...this.props} />
        ))}
      </div>
    )
  }
}

class HeadlinesButton extends Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker)

  render() {
    return (
      <div className={styles.headlineButtonWrapper}>
        <button onClick={this.onClick} className={styles.headlineButton}>
          H
        </button>
      </div>
    )
  }
}

// const toolbarPlugin = createToolbarPlugin()
// const { Toolbar } = toolbarPlugin;
// const plugins = [toolbarPlugin];
const text =
  'In this editor a toolbar shows up once you select part of the text …'

class CustomToolbarEditor extends Component {
  EditorInitIalState = async () => {
    return this.props.editorState
      ? EditorState.createWithContent(this.props.editorState)
      : createEditorStateWithText(this.props.text || text)
  }

  state = {
    toolbarPlugin: createToolbarPlugin(),
    editorState: this.props.editorState
      ? EditorState.createWithContent(this.props.editorState)
      : createEditorStateWithText(this.props.text || text)
  }

  // componentDidMount() {
  //   console.log(this.props, 'PROPS')
  //   const { empty } = this.props
  //   if (empty && empty) {
  //     this.setState({
  //       editorState: EditorState.createEmpty()
  //     })
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    const { resetDraft } = props
    if (resetDraft && resetDraft) {
      state.editorState = createEditorStateWithText(props.text || text)
    }
    return {
      ...state
    }
  }

  onChange = editorState => {
    this.setState(
      {
        editorState,
        html: stateToHTML(editorState.getCurrentContent())
      },
      () => {
        this.props.onChange &&
          this.props.onChange(
            this.state.html,
            this.state.editorState.getCurrentContent().hasText()
          )
      }
    )
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    const { toolbarPlugin, editorState } = this.state
    const { Toolbar } = toolbarPlugin
    const plugins = [toolbarPlugin]
    return (
      <>
        {Toolbar && plugins && (
          <div className={styles.editor} onClick={this.focus}>
            <Toolbar>
              {// may be use React.Fragment instead of div to improve performance after React 16
              externalProps => (
                <div className={styles.toolbarWrapper}>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <HeadlinesButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                </div>
              )}
            </Toolbar>
            <Editor
              editorState={editorState}
              onChange={this.onChange}
              plugins={plugins}
              ref={element => {
                this.editor = element
              }}
            />
          </div>
        )}
      </>
    )
  }
}

export default CustomToolbarEditor
