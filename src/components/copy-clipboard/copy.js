export async function copyContent(text, show_message) {
  try {
    await navigator.clipboard.writeText(text);
    let message = "Wallet address successfully copied to clipboard";
    show_message ? alert(message) : 0;
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

export function CopyButton(text) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
}
