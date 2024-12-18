class Course {
  constructor(title, description, link) {
    this.title = title;
    this.description = description;
    this.link = link;
  }

  getInfo() {
    return `${this.title}: ${this.description} (Lien: ${this.link})`;
  }
}

module.exports = Course;
