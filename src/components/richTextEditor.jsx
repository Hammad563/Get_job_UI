import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// @param {String} props.defaultValue should be the default value of the editor
// @param {(string) => None } props.onChange should be a setter for state
//          variable that needs to be updated 
const RichTextEditor = (props) => {

  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromHTML(props.defaultValue)));
  const [htmlState, setHtmlState] = useState(props.defaultValue);

  // handles editor changes by setting the raw content to html 
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  // helper for converting raw content to html
  const convertContentToHTML = () => {
    let raw = editorState.getCurrentContent()
    let currentContentAsHTML = convertToHTML(raw);
    setHtmlState(currentContentAsHTML);
    props.onChange(currentContentAsHTML);
  }
  
  return (
    <div className="RichTextEditor">
      <Editor 
        editorState={editorState} 
        onEditorStateChange={handleEditorChange}
        placeholder={props.placeholder} 
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  )
}

export default RichTextEditor;