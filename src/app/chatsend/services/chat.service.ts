import { Injectable } from '@angular/core';
import SendBird from 'sendbird';

@Injectable({
  providedIn: 'root',
})
export class ChatSendService {
  sb: any;

  // https://dashboard.sendbird.com
  APP_ID = 'F1F92F1E-978A-4746-9DCD-1FB1407E0F37';

  init() {
    this.sb = new SendBird({ appId: this.APP_ID });
    SendBird.setLogLevel(SendBird.LogLevel.ERROR);
  }

  connect(userId: string, token: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sb.connect(userId, token, (user: any, error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  }

  async isConnected(): Promise<boolean> {
    return !!this.sb && !!this.sb.currentUser && !!this.sb.currentUser.userId;
  }

  async getConnectedUser(): Promise<any> {
    return this.sb && this.sb.currentUser ? this.sb.currentUser : null;
  }

  registerEventHandlers(UNIQUE_HANDLER_ID: string, callback: any) {
    var channelHandler = new this.sb.ChannelHandler();

    channelHandler.onMessageReceived = (channel, message) => {
      callback({
        event: 'onMessageReceived',
        data: {
          channel,
          message,
        },
      });
    };

    // Register the channel handler
    this.sb.addChannelHandler(UNIQUE_HANDLER_ID, channelHandler);
  }

  createGroupChannel(
    channelName: string,
    userIds: Array<string>
  ): Promise<SendBird.GroupChannel> {
    return new Promise((resolve, reject) => {
      const params = new this.sb.GroupChannelParams();
      params.addUserIds(userIds);
      params.isDistinct = true;
      params.name = channelName;
      this.sb.GroupChannel.createChannel(
        params,
        (groupChannel: SendBird.GroupChannel, error: SendBird.SendBirdError) => {
          if (error) {
            reject(error);
          } else {
            resolve(groupChannel);
          }
        }
      );
    });
  }

  getMyGroupChannels(): Promise<Array<SendBird.GroupChannel>> {
    return new Promise((resolve, reject) => {
      const listQuery = this.sb.GroupChannel.createMyGroupChannelListQuery();
      listQuery.includeEmpty = true;
      listQuery.memberStateFilter = 'joined_only';
      listQuery.order = 'latest_last_message';
      listQuery.limit = 15; // The value of pagination limit could be set up to 100.

      listQuery.next(
        (groupChannels: Array<SendBird.GroupChannel>, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(groupChannels);
          }
        }
      );
    });
  }

  getMessagesFromChannel(
    groupChannel: SendBird.GroupChannel
  ): Promise<Array<
    SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage
  >> {
    return new Promise((resolve, reject) => {
      const listQuery = groupChannel.createPreviousMessageListQuery();
      listQuery.limit = 10;
      listQuery.includeMetaArray = true;
      listQuery.includeReaction = true;

      // Retrieving previous messages.
      listQuery.load(
        (messages, error: SendBird.SendBirdError) => {
          if (error) {
            reject(error);
          } else {
            resolve(messages);
          }
        }
      );
    });
  }

  sendMessage(
    channel: SendBird.GroupChannel | SendBird.OpenChannel,
    message: string
  ): Promise<SendBird.UserMessage> {
    return new Promise((resolve, reject) => {
      const params = new this.sb.UserMessageParams();
      params.message = message;
      channel.sendUserMessage(
        params,
        (userMessage, error: SendBird.SendBirdError) => {
          if (error) {
            reject(error);
          } else {
            resolve(userMessage);
          }
        }
      );
    });
  }
}
