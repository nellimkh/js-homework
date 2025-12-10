const Timestampable = Base => class extends Base {
    constructor(...args) {
        super(...args);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    touch() {
        this.updatedAt = new Date();
    }
};

class BaseEntity {}

class User extends Timestampable(BaseEntity) {
    constructor(name) {
        super();
        this.name = name;
    }

    updateName(newName) {
        this.name = newName;
        this.touch();
    }
}

class Post extends Timestampable(BaseEntity) {
    constructor(title, content) {
        super();
        this.title = title;
        this.content = content;
    }

    updateContent(newContent) {
        this.content = newContent;
        this.touch();
    }
}

class Comment extends Timestampable(BaseEntity) {
    constructor(text) {
        super();
        this.text = text;
    }

    updateText(newText) {
        this.text = newText;
        this.touch();
    }
}

const user = new User("Alice");
console.log("User created:", user.name, user.createdAt, user.updatedAt);

setTimeout(() => {
    user.updateName("Alice Cooper");
    console.log("User updated:", user.name, user.updatedAt);
}, 1000);

const post = new Post("Hello World", "This is a post");
console.log("Post created:", post.title, post.createdAt, post.updatedAt);

setTimeout(() => {
    post.updateContent("Updated content");
    console.log("Post updated:", post.content, post.updatedAt);
}, 1500);

const comment = new Comment("Nice post!");
console.log("Comment created:", comment.text, comment.createdAt, comment.updatedAt);

setTimeout(() => {
    comment.updateText("Really nice post!");
    console.log("Comment updated:", comment.text, comment.updatedAt);
}, 2000);
