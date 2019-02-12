let messageId = 0;

function getNextId() {
  messageId += 1;
  return messageId;
}

export function createTextMessage(text) {
  return {
    type: "text",
    id: getNextId(),
    text
  };
}

export function createImageMessage(uri) {
  return {
    type: "image",
    id: getNextId(),
    uri
  };
}

export function createLocationMessage(coordinate) {
  return {
    type: "location",
    id: getNextId(),
    coordinate
  };
}
