import { gql } from "@apollo/client";

export const GET_CHATS_BY_ROOM_IDS = gql`
  query GetChatRooms($roomIds: [String!]!) {
    chatRooms(roomIds: $roomIds) {
      id
      senderId
      receiverId
      text
      roomId
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
