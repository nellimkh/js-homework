const assert = (condition, message, ErrorType = ValidationError) => {
    if (!condition) throw new ErrorType(message);
};

const RE = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[1-9][0-9]{7,14}$/
};

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        Error.captureStackTrace(this, this.constructor);
    }
}

class InvalidMessageError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidMessageError";
        Error.captureStackTrace(this, this.constructor);
    }
}

class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserNotFoundError";
        Error.captureStackTrace(this, this.constructor);
    }
}

const Validators = {
    isNonEmptyString(value, message) {
        assert(typeof value === "string" && value.trim(), message);
    },
    isValidEmail(value, message) {
        assert(RE.email.test(value), message);
    },
    isValidPhone(value, message) {
        assert(RE.phone.test(value), message);
    },
    isValidInstance(instance, parent, message) {
        assert(instance instanceof parent, message);
    },
    isMaxLength(value, max, message) {
        assert(value.length <= max, message);
    }
};

class MessagingOperation {
    static Id = 1;

    constructor(sender, receiver) {
        if (new.target === MessagingOperation) {
            throw new TypeError("Abstract class cannot have instance");
        }

        Validators.isValidInstance(sender, User, "sender must be User");
        Validators.isValidInstance(receiver, User, "receiver must be User");

        this.messageId = MessagingOperation.Id++;
        this.sender = sender;
        this.receiver = receiver;
        this.timestamp = new Date();
        this.isRead = false;
    }

    send() {
        throw new TypeError("Abstract method");
    }

    delete() {
        throw new TypeError("Abstract method");
    }

    markRead() {
        this.isRead = true;
    }

    markUnread() {
        this.isRead = false;
    }
}

class TextMessage extends MessagingOperation {
    constructor(sender, receiver, content, maxLength = 200) {
        super(sender, receiver);
        Validators.isNonEmptyString(content, "Message content cannot be empty");
        Validators.isMaxLength(content, maxLength, "Message too long");

        this.content = content;
    }

    send() {
        this.receiver.receiveMessage(this);
        console.log(`[LOG] TextMessage sent: "${this.content}"`);
    }

    delete() {
        console.log(`[LOG] TextMessage deleted: "${this.content}"`);
    }
}

class MultimediaMessage extends MessagingOperation {
    constructor(sender, receiver, filePath, fileType) {
        super(sender, receiver);
        Validators.isNonEmptyString(filePath, "File path cannot be empty");
        Validators.isNonEmptyString(fileType, "File type cannot be empty");

        this.filePath = filePath;
        this.fileType = fileType;
    }

    send() {
        this.receiver.receiveMessage(this);
        console.log(`[LOG] MultimediaMessage sent: "${this.filePath}" (${this.fileType})`);
    }

    delete() {
        console.log(`[LOG] MultimediaMessage deleted: "${this.filePath}"`);
    }
}

class User {
    #name;
    #contactInfo;
    #conversations = [];

    constructor(name, contactInfo) {
        Validators.isNonEmptyString(name, "Invalid name");
        Validators.isNonEmptyString(contactInfo, "Invalid contact info");
        this.#name = name;
        this.#contactInfo = contactInfo;
        this.isOnline = false;
    }

    get name() { return this.#name; }
    get contactInfo() { return this.#contactInfo; }
    get conversations() { return [...this.#conversations]; }

    createConversation(users) {
        if (!Array.isArray(users) || !users.every(u => u instanceof User)) {
            throw new UserNotFoundError("Invalid users for conversation");
        }
        const conv = new Conversation([this, ...users]);
        this.#conversations.push(conv);
        return conv;
    }

    muteNotifications(conversationId) {
        const conv = this.#conversations.find(c => c.conversationId === conversationId);
        if (!conv) throw new Error("Conversation not found");
        conv.muted = true;
    }

    receiveMessage(message) {
        const conv = this.#conversations.find(c => c.users.includes(message.sender));
        if (conv) {
            conv.addMessage(message);
            if (!conv.muted) {
                console.log(`[NOTIFY] ${this.name} received message from ${message.sender.name}`);
            }
        }
    }
}

class Conversation {
    static Id = 1;

    constructor(users) {
        this.conversationId = Conversation.Id++;
        this.users = users;
        this.history = [];
        this.muted = false;
    }

    addUser(user) {
        Validators.isValidInstance(user, User, "user must be User");
        if (!this.users.includes(user)) this.users.push(user);
    }

    addMessage(message) {
        Validators.isValidInstance(message, MessagingOperation, "message must be MessagingOperation");
        this.history.push(message);
    }

    getHistory(limit = 50) {
        return this.history.slice(-limit);
    }
}