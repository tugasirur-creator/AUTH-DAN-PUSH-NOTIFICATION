import { Expo } from 'expo-server-sdk';

const expo = new Expo();

export async function kirimExpoPush(expoPushToken, messageData) {
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} bukan token Expo yang valid`);
    return;
  }

  const messages = [{
    to: expoPushToken,
    sound: 'default',
    title: messageData.title,
    body: messageData.body,
    data: messageData.data,
  }];

  try {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }
    return tickets;
  } catch (error) {
    console.error('Error pengiriman expo push:', error);
  }
}