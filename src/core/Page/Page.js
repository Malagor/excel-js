export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('Metgod "getRoot" should be implemented');
  }

  afterRender() {
    // hook
  }

  destroy() {
    // hook
  }
}
