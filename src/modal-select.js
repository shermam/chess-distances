export class SelectDialog {
  constructor() {
    this.dialogElement = document.querySelector("#dialog");
    this.pieceSelect = this.dialogElement.querySelector("select#piece");
  }

  async selectPiece() {
    return new Promise((resolve) => {
      this.dialogElement.showModal();
      this.pieceSelect.addEventListener(
        "input",
        () => {
          resolve(this.pieceSelect.value);
          this.dialogElement.close();
        },
        { once: true }
      );
    });
  }
}
