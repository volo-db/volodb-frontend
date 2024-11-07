<template>
  <div class="flex border-x border-t border-gray-600 mt-8 px-8 py-4">
    <button @click="editor.chain().focus().toggleBold().run()">Bold</button>

    <button @click="send" class="ml-auto bg-voloblue-200 text-white rounded p-2">senden</button>
  </div>
  <div class="p-8 border border-gray-600 max-h-[900px] overflow-y-auto">
    <editor-content style="all: initial" :editor="editor" />
  </div>
</template>
s

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { vdbFetchData } from '@/utils/api'

export default {
  setup: () => {
    return { vdbFetchData }
  },

  props: {
    modelValue: {
      type: String,
      default: 'Hey ho lets go'
    }
  },
  methods: {
    async send() {
      // const html =
      //   "<html><head><meta charset='UTF-8'>" +
      //   "<link rel='stylesheet' href='https://unpkg.com/normalize.css@8.0.1/normalize.css' />" +
      //   '<style>' +
      //   '</style>' +
      //   '</head><body>' +
      //   this.modelValue +
      //   '</body></html>'
      const html =
        "<html><head><meta charset='UTF-8'>" +
        '<style>' +
        '</style>' +
        '</head><body>' +
        this.modelValue +
        '</body></html>'

      const objectToSend = {
        html
      }

      console.log(html)

      this.openHtmlInNewTab(await vdbFetchData('documents', 'POST', objectToSend))
    },
    openHtmlInNewTab(htmlString) {
      // Create a new window
      const newWindow = window.open('', '_blank')

      // Write the HTML string into the new window
      newWindow.document.write(htmlString)

      // Close the document to make sure the content is rendered
      newWindow.document.close()
    }
  },
  emits: ['update:modelValue'],
  components: {
    EditorContent
  },

  data() {
    return {
      editor: null
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
      extensions: [StarterKit],
      editorProps: {
        attributes: {
          class: 'bg-white border border-gray-100 h-[1123px] w-[794px] outline-none'
        }
      }
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  }
}
</script>
