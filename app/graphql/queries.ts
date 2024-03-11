import { gql } from "@apollo/client";

export const GET_CHAT_BY_ROOM_IDS = gql`
  query GetLatestMessagesByRooms($roomIds: [String!]!) {
    latestMessagesByRooms(roomIds: $roomIds) {
      id
      senderId
      receiverId
      text
      roomId
      createdAt
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      description
      address
      latitude
      longitude
      totalCapacity
      eventType
      ticketPrice
      ownerId
      eventDate
      eventEndDate
      status
      categories
      ticketPurchaseDeadline
      refundPolicy
      socialLinks
      rating
      availableTickets
      ageRestriction
      organizerContact
      accessibilityInfo
      createdAt
      updatedAt
      images
      documents
    }
  }
`;

export const GET_CHAT_ROOM = gql`
  query GetChatRoom($roomId: String!) {
    chatRoom(roomId: $roomId) {
      id
      senderId
      receiverId
      text
      roomId
    }
  }
`;
