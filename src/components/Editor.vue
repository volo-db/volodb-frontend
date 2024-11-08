<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

export default {
  components: {
    EditorContent
  },

  data() {
    return {
      editor: null
    }
  },

  mounted() {
    this.editor = new Editor({
      // bind Tiptap to `.element`
      element: document.querySelector('.element'),
      // register extensions
      extensions: [StarterKit, Document, Paragraph, Text],
      // set the initial content
      content: '<p>Example Text</p>',
      // place the cursor in the editor after initialization
      autofocus: true,
      // make the text editable (but that’s the default anyway)
      editable: true,
      // disable the loading of the default CSS (which is not much anyway)
      injectCSS: false
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  }
}
</script>
