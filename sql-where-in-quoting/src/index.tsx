import { Form, ActionPanel, Action, showToast, Toast, Clipboard } from "@raycast/api";

type Values = {
  textarea: string;
};

export default function Command() {
  async function handleSubmit(values: Values) {
    const str = values.textarea;
    console.log(str);
    if (!str) {
      showToast({
        style: Toast.Style.Failure,
        title: 'List is empty.'
      })
      return
    }
    const list = str.replace("\r", "").split("\n")
    const converted = list.map(s => `"${s}",`).join("\n").slice(0, -1)
    await Clipboard.copy(converted)
    
    showToast({ title: "Copied!", message: "Converted list is copied to your clipboard." });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} title="Convert" />
        </ActionPanel>
      }
    >
      <Form.TextArea id="textarea" title="List" placeholder="Enter the list" />
    </Form>
  );
}
